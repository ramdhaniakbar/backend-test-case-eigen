import { Borrow } from "src/borrows/entities/borrow.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'books' })
export class Book {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   code: string
   
   @Column({ type: 'character varying' })
   title: string

   @Column({ type: 'character varying' })
   author: string

   @Column({ type: 'int' })
   stock: number
}
