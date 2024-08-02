import { IsNotEmpty, IsString } from "class-validator"

export class CreateBorrowDto {
   @IsNotEmpty()
   @IsString()
   member_code: string

   @IsNotEmpty()
   @IsString()
   book_code: string
}