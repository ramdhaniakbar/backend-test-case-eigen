import { Module } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { ReturnsController } from './returns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from 'src/borrows/entities/borrow.entity';

@Module({
  controllers: [ReturnsController],
  providers: [ReturnsService],
  imports: [TypeOrmModule.forFeature([Borrow])]
})
export class ReturnsModule {}
