import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    try {
      const member = this.membersRepository.create(createMemberDto);
  
      const createMember = await this.membersRepository.save(member);
  
      return {
        message: 'Success create member',
        data: createMember
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll() {
    try {
      return await this.membersRepository.find({
        relations: ['borrows.book']
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: number) {
    try {
      const member = await this.membersRepository.findOne({ where: { id: id } });
      if (!member) {
        throw new NotFoundException('Member not found')
      }
      return member;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    try {
      const member = await this.findOne(id)
  
      Object.assign(member, updateMemberDto)
      
      const updateMember = await this.membersRepository.save(member)
  
      return {
        message: 'Success update member',
        data: updateMember
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number) {
    try {
      const member = await this.findOne(id)
  
      const deleteMember = await this.membersRepository.remove(member)
  
      return {
        message: 'Success delete member',
        data: deleteMember
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }
}
