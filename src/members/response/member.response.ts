import { ApiProperty } from "@nestjs/swagger";

export class MemberResponse {
   @ApiProperty({ example: 1 })
   id: number;

   @ApiProperty({ example: 'M001' })
   code: string;

   @ApiProperty({ example: 'Angga' })
   name: string;
   
   @ApiProperty({ example: '2024-08-05T16:51:54.896Z' })
   penalty_period: Date;
}