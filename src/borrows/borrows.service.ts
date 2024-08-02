import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrow } from './entities/borrow.entity';
import { Repository } from 'typeorm';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { Member } from 'src/members/entities/member.entity';
import { Book } from 'src/books/entities/book.entity';

@Injectable()
export class BorrowsService {
  constructor(
    @InjectRepository(Borrow)
    private readonly borrowsRepository: Repository<Borrow>,
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async borrowBook(createBorrowDto: CreateBorrowDto) {
    try {
      // get member by member_code
      const member = await this.membersRepository.findOne({
        where: { code: createBorrowDto.member_code },
      });

      if (!member) {
        throw new NotFoundException('Member not found');
      }

      const lastEntry = await this.borrowsRepository.findOne({
        order: {
          id: 'DESC',
        },
      });
      console.log('last entry ', lastEntry);

      // check borrow book by member
      const getBorrow = await this.borrowsRepository.find({
        where: { member: member },
      });

      // check the limit of member borrow
      if (getBorrow.length >= 2) {
        throw new BadRequestException('Member has exceeded the borrow limit');
      }

      // check availability book
      const availabilityBook = await this.booksRepository.findOne({
        where: { code: createBorrowDto.book_code },
      });

      if (!availabilityBook) {
        throw new NotFoundException('Book not found');
      } else if (availabilityBook.stock < 1) {
        throw new BadRequestException('Book is not available');
      }

      // get last borrow id

      const lastBorrow = await this.borrowsRepository.find({
        take: 3,
        order: {
          id: 'DESC',
        },
      });
      const autoIncrement = lastBorrow ? lastBorrow[0].id + 1 : 1;

      // get current date
      const currentDate = new Date();

      // proceed with creating the borrow record
      const borrow = new Borrow();
      borrow.borrow_code =
        'BRW' +
        autoIncrement.toString() +
        availabilityBook.code.replace(/-/g, '') +
        member.code;
      borrow.status = 'Borrowed';
      borrow.borrow_date = currentDate;
      borrow.return_date = new Date(
        currentDate.getTime() + 7 * 24 * 60 * 60 * 1000,
      );
      borrow.book = availabilityBook;
      borrow.member = member;

      const createBorrow = await this.borrowsRepository.save(borrow);

      return {
        message: 'Success borrow book',
        data: createBorrow,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
