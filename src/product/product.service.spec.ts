// orders.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepository } from './repository/product.repository';
import { HttpModule, HttpService } from '@nestjs/axios';

describe('ProductService', () => {
    let productService: ProductService;
    let httpService: HttpService;

    const mockProductRepository = {
        insert: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        find: jest.fn()
    };

    const mockSdk = {
        postV2Orders: jest.fn().mockResolvedValue({
            data: {}, // Add the expected data structure here
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [
                ProductService,
                { provide: ProductRepository, useValue: mockProductRepository }
            ],
        }).compile();

        productService = module.get<ProductService>(ProductService);
        httpService = module.get<HttpService>(HttpService);
    });

    it('should be defined', () => {
        expect(productService).toBeDefined();
    });

    it('should create a product', async () => {
        const result = await productService.getProductFromHTTP('https://run.mocky.io/v3/d1d9c2f3-966c-46b8-9814-94b08cfe2812', true);

        expect(result.isSuccess).toEqual(true);
    });


    it('should update a product', async () => {
        const product = {
            productId: 986075332655,
            title: "(D) HILLS LONGLINE CREW 2",
            tags: "color|grey, season|04",
            variants: [
                {
                    variantId: 9510632914991,
                    productCode: "6495694.GRY~12~LN~4",
                    title: "Pink"
                }
            ]
        }

        const result = await productService.updateProduct(product);

        expect(result.isSuccess).toEqual(true);
    });

    it('should remove a product', async () => {
        const result = await productService.removeProduct(986075332655);

        expect(result.isSuccess).toEqual(true);
    });
});
