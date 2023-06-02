import { IsString, IsNumber, IsPostalCode } from 'class-validator';

export class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsNumber()
  pinCode: number;
}
