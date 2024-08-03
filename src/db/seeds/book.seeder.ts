import { Member } from '../../members/entities/member.entity';
import { Book } from '../../books/entities/book.entity';
import { Borrow } from '../../borrows/entities/borrow.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class BookSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<void> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const bookRepository = dataSource.getRepository(Book);
      await bookRepository.createQueryBuilder().delete().from(Book).execute();

      const memberRepository = dataSource.getRepository(Member)
      await memberRepository.createQueryBuilder().delete().from(Member).execute()

      const borrowRepository = dataSource.getRepository(Borrow)
      await borrowRepository.createQueryBuilder().delete().from(Borrow).execute()

      await bookRepository.insert([
        {
          code: 'JK-45',
          title: 'Harry Potter',
          author: 'J.K Rowling',
          stock: 1,
        },
        {
          code: 'SHR-1',
          title: 'A Study in Scarlet',
          author: 'Arthur Conan Doyle',
          stock: 1,
        },
        {
          code: 'TW-11',
          title: 'Twilight',
          author: 'Stephenie Meyer',
          stock: 1,
        },
        {
          code: 'HOB-83',
          title: 'The Hobbit, or There and Back Again',
          author: 'J.R.R. Tolkien',
          stock: 1,
        },
        {
          code: 'NRN-7',
          title: 'The Lion, the Witch and the Wardrobe',
          author: 'C.S. Lewis',
          stock: 1,
        },
      ]);

      await memberRepository.insert([
         {
           code: 'M001',
           name: 'Angga',
         },
         {
           code: 'M002',
           name: 'Ferry',
         },
         {
           code: 'M003',
           name: 'Putri',
         },
       ]);

      await queryRunner.commitTransaction();
      console.log('Seeding completed successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error in seeding:', error);
    } finally {
      await queryRunner.release();
      process.exit(0);
    }
  }
}
