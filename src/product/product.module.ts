import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductRepository } from './repository/product.repository';

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
})
export class ProductModule {};