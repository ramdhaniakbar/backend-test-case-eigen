import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@Controller('borrows')
export class BorrowsController {
  constructor(private readonly borrowsService: BorrowsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  borrowBook(@Body() createBorrowDto: CreateBorrowDto) {
    return this.borrowsService.borrowBook(createBorrowDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.borrowsService.findAll()
  }
}
