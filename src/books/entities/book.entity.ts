import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'books' })
export class Book {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   code: string
   
   @Column({ type: 'text' })
   title: string

   @Column({ type: 'text' })
   author: string

   @Column({ type: 'int' })
   stock: number
}
