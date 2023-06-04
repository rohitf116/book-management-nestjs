import { Optional } from '@nestjs/common';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class AddressUpdateDto {
  @IsString()
  @IsOptional()
  street: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsNumber()
  @IsOptional()
  pinCode: number;
}
