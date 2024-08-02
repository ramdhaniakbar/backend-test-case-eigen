import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BorrowResponse } from './response/borrow.response';

@Controller('borrows')
export class BorrowsController {
  constructor(private readonly borrowsService: BorrowsService) {}

  @Post()
  @ApiOperation({ summary: 'Borrow Book' })
  @ApiCreatedResponse({ status: 201, description: 'The API for borrow books with some conditions', type: BorrowResponse })
  @HttpCode(HttpStatus.CREATED)
  borrowBook(@Body() createBorrowDto: CreateBorrowDto) {
    return this.borrowsService.borrowBook(createBorrowDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Borrow Books' })
  @ApiOkResponse({ status: 200, description: 'The API for get all borrow books', type: [BorrowResponse] })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.borrowsService.findAll()
  }
}
