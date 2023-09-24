import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { query } from 'express';

@Controller('api/products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    @ApiOkResponse({ description: 'Successfully saved product' })
    async getProductFromURL(@Query() url?: string) {
        return await this.productService.getProductFromHTTP(url, false)
    }

    @Post()
    @ApiOkResponse({ description: 'Successfully saved product' })
    async getProductsFromURL(@Query() url?: string) {
        return await this.productService.getProductFromHTTP('https://run.mocky.io/v3/d1d9c2f3-966c-46b8-9814-94b08cfe2812', true)
    }

    // @Post()
    // @ApiOkResponse({ description: 'Successfully saved product' })
    // async getProducts(@Body() create) {
    //     return await this.productService.getProducts()
    // }

    @Put()
    @ApiOkResponse({ description: 'Successfully saved products' })
    async updateProduct(@Body() product: UpdateProductDTO) {
        return await this.productService.updateProduct(product)
    }

    @Delete(':product_id')
    @ApiOkResponse({ description: 'Successfully saved products' })
    async removeProduct(@Param('product_id') productId: number) {
        return await this.productService.removeProduct(productId)
    }
}