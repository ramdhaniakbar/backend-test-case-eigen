import { Book } from 'src/books/entities/book.entity';
import { Borrow } from 'src/borrows/entities/borrow.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'members' })
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'character varying' })
  name: string;

  @OneToMany(() => Borrow, (borrow) => borrow.member)
  borrows: Borrow[]
}
