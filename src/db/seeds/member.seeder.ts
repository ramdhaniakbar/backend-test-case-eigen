import { Borrow } from '../../borrows/entities/borrow.entity';
import { Member } from '../../members/entities/member.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class MemberSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const repository = dataSource.getRepository(Member);
      await repository.createQueryBuilder().delete().from(Member).execute();

      const borrowRepository = dataSource.getRepository(Borrow)
      await borrowRepository.createQueryBuilder().delete().from(Borrow).execute()

      await repository.insert([
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
      console.log('Member seeding completed successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error in member seeding:', error);
    } finally {
      await queryRunner.release();
      process.exit(0);
    }
  }
}
