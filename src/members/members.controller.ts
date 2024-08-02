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
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MemberResponse } from './response/member.response';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ApiOperation({ summary: 'Create Member' })
  @ApiCreatedResponse({ status: 201, description: 'The API for create a member', type: MemberResponse })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Members' })
  @ApiOkResponse({ status: 200, description: 'The API for get all members', type: [MemberResponse] })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Member' })
  @ApiOkResponse({ status: 200, description: 'The API for get one member', type: MemberResponse })
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Member' })
  @ApiOkResponse({ status: 200, description: 'The API for update a member', type: MemberResponse })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Member' })
  @ApiOkResponse({ status: 200, description: 'The API for delete a member', type: MemberResponse })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
}
