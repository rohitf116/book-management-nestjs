import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsEmail,
  MinLength,
  ValidateNested,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { IsPhoneNumber } from '../decorators/is-phone-number.decorator';
import { AddressUpdateDto } from './address-update.dto';
import { Title } from '../enum/title.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsEnum(Title)
  @IsOptional()
  title: string;

  @IsEmail()
  @IsOptional()
  email: string;

  //   @IsNumber()

  @IsOptional()
  @IsPhoneNumber()
  phone: number;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsOptional()
  password: string;

  @IsNotEmpty()
  @ValidateNested()
  @IsOptional()
  @Type(() => AddressUpdateDto)
  address: AddressUpdateDto;
}
