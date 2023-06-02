import {
  ConflictException,
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
  async create(createUserDto: CreateUserDto) {
    const isEmailExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (isEmailExist) {
      throw new ConflictException('Email is already in use');
    }
    const isPhoneExist = await this.userModel.findOne({
      phone: createUserDto.phone,
    });
    if (isPhoneExist) {
      throw new ConflictException('Phone is already in use');
    }
    const createdUser = new this.userModel(createUserDto);
    const savedUser = await createdUser.save();

    return savedUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
