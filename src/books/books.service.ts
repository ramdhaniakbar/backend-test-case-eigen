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

    const createBook = await this.booksRepository.save(book);

    return {
      message: 'Success create book',
      data: createBook,
    };
  }

  async findAll() {
    return await this.booksRepository.find();
  }

  async findOne(id: number) {
    const book = await this.booksRepository.findOne({ where: { id: id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);

    Object.assign(book, updateBookDto);

    const updateBook = await this.booksRepository.save(book);

    return {
      message: 'Success update book',
      data: updateBook,
    };
  }

  async remove(id: number) {
    const book = await this.findOne(id);

    const deleteBook = await this.booksRepository.remove(book);

    return {
      message: 'Success delete book',
      data: deleteBook,
    };
  }
}
