import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReturnDto } from './dto/create-return.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrow } from 'src/borrows/entities/borrow.entity';
import { DataSource, Repository } from 'typeorm';
import { Member } from 'src/members/entities/member.entity';
import { Book } from 'src/books/entities/book.entity';
import * as moment from 'moment';

@Injectable()
export class ReturnsService {
  constructor(
    @InjectRepository(Borrow)
    private readonly borrowsRepository: Repository<Borrow>,
    private dataSource: DataSource,
  ) {}

  async returnBook(createReturnDto: CreateReturnDto) {
    return this.dataSource.transaction(async (manager) => {
      // get member by member_code
      const member = await manager.findOne(Member, {
        where: { code: createReturnDto.member_code },
      });

      // check the member is exist
      if (!member) {
        throw new NotFoundException('Member not found');
      }

      const book = await manager.findOne(Book, {
        where: { code: createReturnDto.book_code },
      });

      // check the book is exist
      if (!book) {
        throw new NotFoundException('Book not found');
      }

      // check the book is borrowed or not
      const checkBorrow = await manager.findOne(Borrow, {
        where: {
          member: member,
          book: book,
          borrow_code: createReturnDto.borrow_code,
        },
        relations: { book: true, member: true },
      });

      // check the book is exist
      if (!checkBorrow) {
        throw new NotFoundException('Borrow book not found');
      }

      const returnDate = moment(checkBorrow.return_date);
      const currentDate = moment();

      // check if the book is returned late
      if (returnDate.isBefore(currentDate)) {
        member.penalty_period = currentDate.add(3, 'days').toDate();
        await manager.save(member);
      }

      book.stock += 1;
      await manager.save(book);

      checkBorrow.status = 'Returned';
      await manager.save(checkBorrow);

      return {
        message: 'Success return book',
        data: checkBorrow,
      };
    });
  }

  async findAll() {
    return await this.borrowsRepository
      .createQueryBuilder('borrow')
      .leftJoinAndSelect('borrow.book', 'book')
      .leftJoinAndSelect('borrow.member', 'member')
      .where('borrow.status = :status', { status: 'Returned' })
      .getMany();
  }
}
