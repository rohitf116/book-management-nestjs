import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsEmail,
  MinLength,
  MaxLength,
  IsNumber,
  ValidateNested,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Title } from '../enum/title.enum';
import { AddressDto } from './address.dto';
import { IsPhoneNumber } from '../decorators/is-phone-number.decorator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEnum(Title)
  title: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: number;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
