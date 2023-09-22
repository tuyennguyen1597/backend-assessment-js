import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductRequestDTO } from '../dto/create-product-request.dto';
import { Product } from 'src/entities/product.entity';
import { DataSource } from 'typeorm';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { Error } from 'src/types/error.enum';
import { FindProductDTO } from '../dto/find-product.dto';

@Injectable()
export class ProductRepository {
    constructor(
        private dataSource: DataSource
    ) { }

    // Create product
    async insert(product: CreateProductRequestDTO) {
        const queryRunner = this.dataSource.createQueryRunner();
        const productAdded: Product[] = [];
        const products: Product[] = []
        
        try {
            await queryRunner.connect()
            await queryRunner.startTransaction()

            product.variants.forEach(productVar => {
                const productEntity = new Product();
                Object.assign(productEntity, product);
                productEntity.variantId = productVar.variantId
                productEntity.sku = productVar.productCode
                products.push(productEntity)
            })


            for (var productEntity of products) {
                try {
                    await queryRunner.manager.save(productEntity);
                    productAdded.push(productEntity)
                } catch (error) {
                    if (error.code === Error.DUPLICATION) {
                        productAdded.push(productEntity)
                    } else {
                        throw new HttpException(error.messages, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
                    }
                }
            }
            await queryRunner.commitTransaction()
            return productAdded;
        } finally {
            if (!queryRunner.isReleased) await queryRunner.release()
        }
    }


    async update(product: UpdateProductDTO) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect()
            await queryRunner.startTransaction()
            const productEntity = new Product();
            if (product.variants) {
                for (var variant of product.variants) {
                    productEntity.productId = product.productId
                    productEntity.title = product.title
                    productEntity.tags = product.tags
                    productEntity.variantId = variant.variantId
                    productEntity.sku = variant.productCode

                    await queryRunner.manager.update(Product, {
                        productId: productEntity.productId,
                        variantId: productEntity.variantId
                    }, productEntity);

                }
            } else {
                productEntity.productId = product.productId
                productEntity.title = product.title
                productEntity.tags = product.tags

                await queryRunner.manager.update(Product, {
                    productId: productEntity.productId
                }, productEntity);
            }

            await queryRunner.commitTransaction()

            return productEntity
        } catch (error) {
            await queryRunner.rollbackTransaction()
        } finally {
            if (!queryRunner.isReleased) await queryRunner.release()
        }
    }

    async delete(productId: number) {
        const productToFind = new FindProductDTO()
        productToFind.productId = productId.toString()

        const products: Product[] = await this.find(productToFind);

        if (!products.length) throw new NotFoundException('Product is not existed! Please verify the product')

        const queryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.connect()
            await queryRunner.startTransaction()
            const deletedProducts = await queryRunner.manager.delete(Product, { productId: productId.toString() })
            await queryRunner.commitTransaction()
            return deletedProducts.affected
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw new HttpException(error.messages, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        } finally {
            if (!queryRunner.isReleased) await queryRunner.release()
        }
    }

    async find(product: FindProductDTO) {
        const queryRunner = this.dataSource.createQueryRunner();
        const products = await queryRunner.manager.findBy(Product, product)
        return products
    }
}