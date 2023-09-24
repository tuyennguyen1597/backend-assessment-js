import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { query } from 'express';
import { CreateProductsRequestDTO } from './dto/create-products-request.dto';

@Controller('api/products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    @ApiOperation({
        summary: 'Create a product by entering url',
        description: 'Create products by calling MindArc API',
    })
    @ApiOkResponse({ description: 'Successfully saved product' })
    async getProductFromURL(@Query('url') url?: string) {
        if (!url) url = 'https://run.mocky.io/v3/d9138d51-6d11-4682-8068-d1217716fdbf'
        return await this.productService.getProductFromHTTP(url, false)
    }

    @ApiOperation({
        summary: 'Create products by entering url',
        description: 'Create products by calling MindArc API',
    })
    @Post('url')
    @ApiOkResponse({ description: 'Successfully saved product' })
    async getProductsFromURL(@Query('url') url?: string) {
        if (!url) url = 'https://run.mocky.io/v3/d1d9c2f3-966c-46b8-9814-94b08cfe2812'
        return await this.productService.getProductFromHTTP(url, true)
    }

    @ApiOperation({
        summary: 'Create products',
        description: 'Create products by calling MindArc API',
    })
    @ApiBody({
        type: CreateProductsRequestDTO,
        description: 'Product details',
    })
    @Post()
    @ApiOkResponse({ description: 'Successfully saved product' })
    async getProducts(@Body() createProductDTO: CreateProductsRequestDTO) {
        return await this.productService.insertProduct(createProductDTO.products)
    }

    @Put()
    @ApiOperation({
        summary: 'Update products',
        description: 'Update products by calling MindArc API',
    })
    @ApiOkResponse({ description: 'Successfully saved products' })
    async updateProduct(@Body() product: UpdateProductDTO) {
        return await this.productService.updateProduct(product)
    }

    @Delete(':product_id')
    @ApiOperation({
        summary: 'Delete products',
        description: 'Delete products by calling MindArc API',
    })
    @ApiOkResponse({ description: 'Successfully saved products' })
    async removeProduct(@Param('product_id') productId: number) {
        return await this.productService.removeProduct(productId)
    }
}