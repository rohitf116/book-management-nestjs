import { Optional } from '@nestjs/common';
import { IsString, IsNumber } from 'class-validator';

export class AddressUpdateDto {
  @IsString()
  @Optional()
  street: string;

  @IsString()
  @Optional()
  city: string;

  @IsNumber()
  @Optional()
  pinCode: number;
}
