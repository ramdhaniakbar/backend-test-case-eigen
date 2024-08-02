import { Book } from 'src/books/entities/book.entity';
import { Member } from 'src/members/entities/member.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'borrows' })
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  borrow_code: string;

  @Column({ enum: ['Borrowed', 'Returned'] })
  status: string;

  @Column({ type: 'timestamptz' })
  borrow_date: Date;

  @Column({ type: 'timestamptz' })
  return_date: Date;

  @ManyToOne(() => Book, (book) => book.id)
  book: Book;

  @ManyToOne(() => Member, (member) => member.id)
  member: Member;
}
