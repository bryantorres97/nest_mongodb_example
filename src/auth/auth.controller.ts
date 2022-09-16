import {
  Controller,
  Logger,
  Post,
  Body,
  UseGuards,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserEntity } from '../users/classes/user.class';
import { User } from '../common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto, LoginDto } from './dtos';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import { getError } from '../common/helpers/manageErrors.helper';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginDto, @User() user: UserEntity) {
    this.logger.log(`Login user: ${body.email}`);
    const data = this.authService.login(user);
    return data;
  }

  @Post('change-password')
  async changePassword(@Res() res: Response, @Body() data: ChangePasswordDto) {
    try {
      this.logger.log(`Changing password: ${data.token.substring(0, 10)}...`);
      const { token, password } = data;
      const dataToken = await this.authService.validateToken(token);
      if (!dataToken.sub)
        throw new NotFoundException('No se encontró el usuario');
      const user = await this.usersService.changePassword(
        dataToken.sub,
        password,
      );
      if (!user)
        throw new NotFoundException('No se ha podido cambiar la contraseña');
      const loggedData = this.authService.login(user);
      return res.json(loggedData);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }
}
