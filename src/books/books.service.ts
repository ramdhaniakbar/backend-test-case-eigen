import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    try {
      const book = this.booksRepository.create(createBookDto);
  
      const createBook = await this.booksRepository.save(book)
  
      return {
        message: 'Success create book',
        data: createBook
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll() {
    try {
      return await this.booksRepository.find();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: number) {
    try {
      const book = await this.booksRepository.findOne({ where: { id: id } });
      if (!book) {
        throw new NotFoundException('Book not found')
      }
      return book;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const book = await this.findOne(id);
  
      Object.assign(book, updateBookDto)
  
      const updateBook = await this.booksRepository.save(book);
  
      return {
        message: 'Success update book',
        data: updateBook
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number) {
    try {
      const book = await this.findOne(id)
  
      const deleteBook = await this.booksRepository.remove(book)
  
      return {
        message: 'Success delete book',
        data: deleteBook
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }
}
