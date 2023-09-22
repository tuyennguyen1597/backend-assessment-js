import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { databaseConfig } from './config/database/database.provider';

@Module({
  imports: [ProductModule, HttpModule,
    TypeOrmModule.forRoot(databaseConfig)
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
