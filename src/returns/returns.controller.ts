import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { CreateReturnDto } from './dto/create-return.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ReturnResponse } from './response/return.response';

@Controller('returns')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Post()
  @ApiOperation({ summary: 'Return Book' })
  @ApiCreatedResponse({ status: 201, description: 'The API for return book with some condition', type: ReturnResponse })
  @HttpCode(HttpStatus.CREATED)
  returnBook(@Body() createReturnDto: CreateReturnDto) {
    return this.returnsService.returnBook(createReturnDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Return Books' })
  @ApiOkResponse({ status: 200, description: 'The API for get all return books', type: [ReturnResponse] })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.returnsService.findAll()
  }
}
