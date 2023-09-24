// orders.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ResponseResult } from '../shared/response/response';
import { ProductService } from './product.service';

describe('ProductController', () => {
    let controller: ProductController;

    const mockProductService = {
        getProductFromHTTP: jest.fn(),
        updateProduct: jest.fn(),
        removeProduct: jest.fn()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [{ provide: ProductService, useValue: mockProductService }],
        }).compile();

        controller = module.get<ProductController>(ProductController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should get and insert a product from url', async () => {
        mockProductService.getProductFromHTTP.mockResolvedValue(new ResponseResult(true, 'Success'))

        const result = await controller.getProductFromURL('https://run.mocky.io/v3/d9138d51-6d11-4682-8068-d1217716fdbf')

        expect(result.isSuccess).toEqual(true);
    });

    it('should get and insert products from url', async () => {
        mockProductService.getProductFromHTTP.mockResolvedValue(new ResponseResult(true, 'Success'))

        const result = await controller.getProductFromURL('https://run.mocky.io/v3/d1d9c2f3-966c-46b8-9814-94b08cfe2812')

        expect(result.isSuccess).toEqual(true);
    });
});
