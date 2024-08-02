import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateReturnDto {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   member_code: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   book_code: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   borrow_code: string;
}
