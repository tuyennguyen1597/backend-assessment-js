import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

export class UpdateProductDTO {
    @IsNotEmpty()
    @Expose({ name: 'id' })
    productId: string;

    @IsString()
    @IsOptional()
    title: string;

    @IsOptional()
    @IsString()
    tags: string;

    @IsArray()
    @IsOptional()
    @Type(() => Variant)
    @ValidateNested({ each: true })
    variants: Variant[];
}

class Variant {
    @IsNotEmpty()
    @Expose({ name: 'id' })
    variantId: string

    @IsString()
    @IsOptional()
    @Expose({ name: 'sku' })
    productCode: string;

    @IsString()
    @IsOptional()
    title: string;
}