import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrow } from './entities/borrow.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { Member } from 'src/members/entities/member.entity';
import { Book } from 'src/books/entities/book.entity';
import * as moment from 'moment';

@Injectable()
export class BorrowsService {
  constructor(
    @InjectRepository(Borrow)
    private readonly borrowsRepository: Repository<Borrow>,
    private dataSource: DataSource,
  ) {}

  async borrowBook(createBorrowDto: CreateBorrowDto) {
    return this.dataSource.transaction(async (manager) => {
      // get member by member_code
      const member = await manager.findOne(Member, {
        where: { code: createBorrowDto.member_code },
      });

      // get current date
      const currentDate = new Date();

      // check the member is exist
      if (!member) {
        throw new NotFoundException('Member not found');
      } else if (member.penalty_period && moment(member.penalty_period).isAfter(currentDate)) {
        throw new BadRequestException('Currently members still have penalties, cannot able to borrow the book')
      }

      // check borrow book by member
      const getBorrow = await manager.find(Borrow, {
        where: { member: member, status: 'Borrowed' },
      });

      // check the limit of member borrow
      if (getBorrow.length >= 2) {
        throw new BadRequestException('Member has exceeded the borrow limit');
      }

      // check availability book
      const availabilityBook = await manager.findOne(Book, {
        where: { code: createBorrowDto.book_code },
      });

      if (!availabilityBook) {
        throw new NotFoundException('Book not found');
      } else if (availabilityBook.stock < 1) {
        throw new BadRequestException('Book is not available');
      }

      // get last borrow id
      const lastBorrow = await manager.find(Borrow, {
        take: 3,
        order: {
          id: 'DESC',
        },
      });
      const autoIncrement = lastBorrow ? lastBorrow[0].id + 1 : 1;

      // proceed with creating the borrow record
      const borrow = new Borrow();
      borrow.borrow_code = 'BRW' + autoIncrement.toString() + availabilityBook.code.replace(/-/g, '') + member.code;
      borrow.status = 'Borrowed';
      borrow.borrow_date = currentDate;
      borrow.return_date = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      borrow.book = availabilityBook;
      borrow.member = member;

      // save borrow book
      const createBorrow = await manager.save(borrow);

      // decrement the stock from the books table
      availabilityBook.stock -= 1;
      await manager.save(availabilityBook);

      return {
        message: 'Success borrow book',
        data: createBorrow,
      };
    });
  }

  async findAll() {
    return await this.borrowsRepository.find({
      relations: ['book', 'member']
    })
  }
}
