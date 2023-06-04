import {
  ConflictException,
  HttpCode,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model, Connection, Types } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}
  async isEmailAlreadyTaken(email: string): Promise<boolean> {
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }
    return true;
  }
  async isPhoneAlreadyTaken(phone: number): Promise<boolean> {
    const existingUser = await this.userModel.findOne({ phone });

    if (existingUser) {
      throw new ConflictException('Phone is already in use');
    }
    return true;
  }
  async create(createUserDto: CreateUserDto) {
    await this.isEmailAlreadyTaken(createUserDto.email);
    await this.isPhoneAlreadyTaken(createUserDto.phone);
    const createdUser = new this.userModel(createUserDto);
    const savedUser = await createdUser.save();

    return savedUser;
  }

  async findAll() {
    const allUsers = await this.userModel.find();

    return allUsers;
  }

  async findOne(id: Types.ObjectId) {
    const user = await this.userModel.findOne({ _id: id });
    console.log(user);
    return user;
  }

  async update(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto?.email && updateUserDto?.email !== user.email) {
      await this.isEmailAlreadyTaken(updateUserDto.email);
    }

    if (updateUserDto?.phone && updateUserDto?.phone !== user.phone) {
      await this.isPhoneAlreadyTaken(updateUserDto.phone);
    }
    Object.assign(user, updateUserDto);
    await user.save();
    return user;
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async remove(id: Types.ObjectId) {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return { statusCode: 200, message: 'User successfully deleted' };
  }
}
