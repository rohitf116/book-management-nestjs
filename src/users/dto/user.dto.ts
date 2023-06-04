import { Expose, Transform, Type } from 'class-transformer';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { AddressDto } from './address.dto';
import { Types } from 'mongoose';

export class UserDto {
  @Expose()
  @IsOptional()
  @Transform((params) => params?.obj?._id?.toString())
  _id: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  title: string;

  @Expose()
  email: string;

  @Expose()
  phone: number;

  @Expose()
  address: AddressDto;
}
