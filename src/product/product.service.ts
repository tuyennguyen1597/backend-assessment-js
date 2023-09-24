import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateProductRequestDTO } from './dto/create-product-request.dto';
import { AxiosError } from 'axios';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { CreateProductsRequestDTO } from './dto/create-products-request.dto';
import { ProductRepository } from './repository/product.repository';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ResponseResult } from '../shared/response/response';

@Injectable()
export class ProductService {

    constructor(private readonly httpService: HttpService,
        private readonly productRepository: ProductRepository) { }

    async getProductFromHTTP(url: string, isMultipleProducts: boolean = false) {
        const { data } = await firstValueFrom(this.httpService.get(url).pipe(
            catchError((error: AxiosError) => {
                throw new InternalServerErrorException('Could not retrieve data from endpoint. Please try again later!')
            })
        ))

        let products: CreateProductRequestDTO[] = []

        if (!isMultipleProducts) {
            const product = plainToInstance(CreateProductRequestDTO, data)
            products.push(product)
        } else {
            products = plainToInstance(CreateProductsRequestDTO, data).products;
        }
 
        return await this.insertProduct(products)
    }

    async insertProduct(product: CreateProductRequestDTO[]) {
        const products = await this.productRepository.insert(product[0]);
        
        return new ResponseResult(true,`Products are added successfully`)
    }

    async updateProduct(product: UpdateProductDTO) {
        const updatedProduct =  await this.productRepository.update(product);
        return new ResponseResult(true,`Successfully updated product` )
    }

    async removeProduct(productId: number) {
        await this.productRepository.delete(productId)
        return new ResponseResult(true,`Successfully deleted product` )
    }
} 