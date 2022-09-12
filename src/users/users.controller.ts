import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UsersService } from './users.service';
import { getError } from '../common/helpers/manageErrors.helper';
import { CreateUserDto, UpdateUserDto } from './dtos';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers(@Res() res: Response) {
    try {
      this.logger.log('findAllUsers');
      const users = await this.usersService.findAllUsers();
      return res.json(users);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get(':id')
  async findUser(@Res() res: Response, @Param('id') _id: string) {
    try {
      this.logger.log(`findUser with id: ${_id}`);
      const user = await this.usersService.findUser({ _id });
      if (!user) throw new NotFoundException('No se ha encontrado el usuario');
      return res.json(user);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Post()
  async createUser(@Res() res: Response, @Body() user: CreateUserDto) {
    try {
      this.logger.log(`createUser: ${JSON.stringify(user, null, 2)}`);
      const existsUser = await this.usersService.findUser({
        email: user.email,
      });
      if (existsUser)
        throw new BadRequestException(
          `El usuario con el email ${user.email} ya se encuentra registrado`,
        );
      const newUser = await this.usersService.createUser(user);
      if (!newUser)
        throw new BadRequestException('No se ha podido crear el usuario');
      return res.json(newUser);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Put(':id')
  async updateUser(
    @Res() res: Response,
    @Param('id') _id: string,
    @Body() user: UpdateUserDto,
  ) {
    try {
      this.logger.log(`Update user with id: ${_id}`);
      const existsUser = await this.usersService.findUser({
        email: user.email,
      });
      if (existsUser && existsUser._id != _id)
        throw new BadRequestException('El email ya se encuentra registrado');
      const updatedUser = await this.usersService.updateUser(_id, user);
      if (!updatedUser)
        throw new BadRequestException('No se ha podido actualizar el usuario');
      return res.json(updatedUser);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Delete(':id')
  async deleteUser(@Res() res: Response, @Param('id') _id: string) {
    try {
      this.logger.log(`Delete user with id: ${_id}`);
      const deletedUser = await this.usersService.deleteUser(_id);
      if (!deletedUser)
        throw new BadRequestException('No se ha podido eliminar el usuario');
      return res.json(deletedUser);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }
}
