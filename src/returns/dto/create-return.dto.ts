import { IsNotEmpty, IsString } from "class-validator";

export class CreateReturnDto {
   @IsNotEmpty()
   @IsString()
   member_code: string;

   @IsNotEmpty()
   @IsString()
   book_code: string;

   @IsNotEmpty()
   @IsString()
   borrow_code: string;
}
