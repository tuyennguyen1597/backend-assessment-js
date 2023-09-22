import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    @ApiOkResponse({ description: 'Successfully saved product' })
    async getProduct() {
        return await this.productService.getProductFromHTTP('https://run.mocky.io/v3/d1d9c2f3-966c-46b8-9814-94b08cfe2812', true)
    }

    @Post()
    async updateProduct(@Body() product: UpdateProductDTO) {
        return await this.productService.updateProduct(product)
    }

    @Delete(':product_id')
    async removeProduct(@Param('product_id') productId: number) {
        return await this.productService.removeProduct(productId)
    }
}