import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  code?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  author?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  stock?: number;
}
