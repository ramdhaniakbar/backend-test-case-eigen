import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
