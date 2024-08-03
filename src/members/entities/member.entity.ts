import { Borrow } from '../../borrows/entities/borrow.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'members' })
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'character varying' })
  name: string;

  @Column({ type: 'timestamptz', nullable: true })
  penalty_period: Date;

  @OneToMany(() => Borrow, (borrow) => borrow.member)
  borrows: Borrow[]
}
