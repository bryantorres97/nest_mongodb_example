import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JWT_RESTORE_EXPIRES_IN, JWT_SECRET } from '../config/constants.config';
import { UsersService } from '../users/users.service';
import { User } from '../users/classes/user.class';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private config: ConfigService,
    private usersService: UsersService,
  ) {}

  login(user: User) {
    const payload = { sub: user._id };
    delete user._id;
    return { user, accessToken: this.jwtService.sign(payload) };
  }

  async getTokenForUser(email: string) {
    const user = await this.usersService.findUser({ email });
    if (!user) return null;
    const payload = { sub: user._id };
    return {
      email,
      name: user.name,
      token: this.jwtService.sign(payload, {
        expiresIn: JWT_RESTORE_EXPIRES_IN,
      }),
    };
  }

  async validateToken(token: string) {
    return this.jwtService.verify(token, {
      ignoreExpiration: false,
      secret: this.config.get<string>(JWT_SECRET),
    });
  }
}
