import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsEmail,
  IsPhoneNumber,
  MinLength,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { AddressUpdateDto } from './address-update.dto';
import { Title } from '../enum/title.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEnum(Title)
  title: string;

  @IsEmail()
  email: string;

  //   @IsNumber()
  @IsPhoneNumber()
  phone: number;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressUpdateDto)
  address: AddressUpdateDto;
}
