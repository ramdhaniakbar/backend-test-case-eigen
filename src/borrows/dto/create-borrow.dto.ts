import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateBorrowDto {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   member_code: string

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   book_code: string
}