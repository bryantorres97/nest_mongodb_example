import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userModelName } from './schemas/user.schema';
import { User } from './classes/user.class';
import { CreateUserDto, GetUserDto, UpdateUserDto } from './dtos';
import { IUser } from '../users/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(userModelName) private readonly userModel: Model<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return await this.userModel.find({ isActive: true });
  }

  async findUser(user: GetUserDto): Promise<User> {
    return await this.userModel.findOne({ ...user, isActive: true });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.userModel.create(user);
  }

  async updateUser(_id: string, user: UpdateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { _id, isActive: true },
      user,
      { new: true },
    );
  }

  async deleteUser(_id: string): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { _id, isActive: true },
      { isActive: false },
      { new: true },
    );
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne<IUser>({ email, isActive: true });
    if (user && (await user.comparePassword(password))) return user;
    return null;
  }
}
