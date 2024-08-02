import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BookResponse } from './response/book.response';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create Book' })
  @ApiCreatedResponse({ status: 201, description: 'The API for create a book', type: BookResponse })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Books' })
  @ApiOkResponse({ status: 200, description: 'The API for get all books', type: [BookResponse] })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Book' })
  @ApiOkResponse({ status: 200, description: 'The API for get one book', type: BookResponse })
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Book' })
  @ApiOkResponse({ status: 200, description: 'The API for update a book', type: BookResponse })
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Book' })
  @ApiOkResponse({ status: 200, description: 'The API for delete a book', type: BookResponse })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
