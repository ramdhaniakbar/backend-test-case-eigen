import { IsNotEmpty, IsString } from "class-validator"

export class CreateMemberDto {
   @IsNotEmpty()
   @IsString()
   code: string

   @IsNotEmpty()
   @IsString()
   name: string
}
