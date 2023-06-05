import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsISBN,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  excerpt: string;

  userId: string;

  @IsNotEmpty()
  @IsNumber()
  @IsISBN()
  ISBN: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @ArrayMinSize(1, { message: 'At least one string is required' })
  @ArrayMaxSize(10, { message: 'Maximum of 10 strings allowed' })
  @IsString({ each: true, message: 'Each item must be a string' })
  subcategory: string[];
}
