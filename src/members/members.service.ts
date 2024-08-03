import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const member = this.membersRepository.create(createMemberDto);

    const createMember = await this.membersRepository.save(member);

    return {
      message: 'Success create member',
      data: createMember,
    };
  }

  async findAll() {
    return await this.membersRepository.createQueryBuilder('member')
      .leftJoinAndSelect('member.borrows', 'borrow')
      .leftJoinAndSelect('borrow.book', 'book')
      .getMany();
  }

  async findOne(id: number) {
    const member = await this.membersRepository.findOne({
      where: { id: id },
    });
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const member = await this.findOne(id);

    Object.assign(member, updateMemberDto);

    const updateMember = await this.membersRepository.save(member);

    return {
      message: 'Success update member',
      data: updateMember,
    };
  }

  async remove(id: number) {
    const member = await this.findOne(id);

    const deleteMember = await this.membersRepository.remove(member);

    return {
      message: 'Success delete member',
      data: deleteMember,
    };
  }
}
