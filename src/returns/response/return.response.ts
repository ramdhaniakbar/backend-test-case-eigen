import { ApiProperty } from "@nestjs/swagger";
import { BookResponse } from "src/books/response/book.response";
import { MemberResponse } from "src/members/response/member.response";

export class ReturnResponse {
   @ApiProperty({ example: 1 })
   id: number;

   @ApiProperty({ example: 'BRW10LOTR34M005' })
   borrow_code: string;

   @ApiProperty({ example: 'Returned' })
   status: string;

   @ApiProperty({ example: '2024-08-02T19:20:08.786Z' })
   borrow_date: Date;

   @ApiProperty({ example: '2024-08-09T19:20:08.786Z' })
   return_date: Date;

   @ApiProperty({ example: BookResponse })
   book: BookResponse;

   @ApiProperty({ example: MemberResponse })
   member: MemberResponse;
}