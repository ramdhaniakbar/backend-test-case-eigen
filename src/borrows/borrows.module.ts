import { Module } from '@nestjs/common';
import { BorrowsController } from './borrows.controller';
import { BorrowsService } from './borrows.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from './entities/borrow.entity';
import { Member } from 'src/members/entities/member.entity';
import { Book } from 'src/books/entities/book.entity';

@Module({
  controllers: [BorrowsController],
  providers: [BorrowsService],
  imports: [TypeOrmModule.forFeature([Borrow, Member, Book])],
})
export class BorrowsModule {}
