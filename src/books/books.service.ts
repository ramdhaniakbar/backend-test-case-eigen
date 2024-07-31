import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = this.booksRepository.create(createBookDto);

    return await this.booksRepository.save(book);
  }

  async findAll() {
    return await this.booksRepository.find();
  }

  async findOne(id: number) {
    return await this.booksRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);

    if (!book) {
      throw new NotFoundException()
    }

    Object.assign(book, updateBookDto)

    return await this.booksRepository.save(book);
  }

  async remove(id: number) {
    const book = await this.findOne(id)
    if (!book) {
      throw new NotFoundException()
    }

    return await this.booksRepository.remove(book)
  }
}
