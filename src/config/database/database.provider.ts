import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv'
dotenv.config()

export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  ssl: {}
};

export default new DataSource(databaseConfig);