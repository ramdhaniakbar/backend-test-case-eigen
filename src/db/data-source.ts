import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions, runSeeders } from 'typeorm-extension';
import BookSeeder from './seeds/book.seeder';
import { Book } from '../books/entities/book.entity';
import { Member } from '../members/entities/member.entity';
import { Borrow } from '../borrows/entities/borrow.entity';
import MemberSeeder from './seeds/member.seeder';

config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Book, Member, Borrow],
  seeds: [BookSeeder, MemberSeeder],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

dataSource
  .initialize()
  .then(async () => {
    console.log('Data Source Initialized');
    await runSeeders(dataSource);
    console.log('Seeding completed');
    process.exit(0); // Exit after seeding is complete
  })
  .catch((error) => {
    console.error('Error initializing data source:', error);
    process.exit(1); // Exit with error code
  });
