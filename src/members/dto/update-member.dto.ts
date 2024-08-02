import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
   @ApiPropertyOptional()
   @IsNotEmpty()
   @IsString()
   code?: string

   @ApiPropertyOptional()
   @IsNotEmpty()
   @IsString()
   name?: string
}
