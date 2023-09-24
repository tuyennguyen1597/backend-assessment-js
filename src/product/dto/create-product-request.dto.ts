import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { number, string } from 'yargs';

export class CreateProductRequestDTO {
    @ApiProperty({
        type: number,
        description: 'This is a required property'
    })
    @IsNotEmpty()
    @Expose({ name: 'id' })
    productId: number;

    @ApiProperty({
        type: string,
        description: 'This is a required property'
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        type: string,
        description: 'This is an optional property'
    })
    @IsOptional()
    @IsString()
    tags: string;

    @ApiProperty({
        type: [],
        description: 'This is a required property'
    })
    @IsArray()
    @IsNotEmpty()
    @Type(() => Variant)
    @ValidateNested({ each: true })
    variants: Variant[];
}

class Variant {
    @ApiProperty({
        type: number,
        description: 'This is a required property'
    })
    @Expose({ name: 'id' })
    variantId: number

    @ApiProperty({
        type: string,
        description: 'This is a required property'
    })
    @IsString()
    @IsNotEmpty()
    @Expose({ name: 'sku' })
    productCode: string;

    @ApiProperty({
        type: string,
        description: 'This is a required property'
    })
    @IsString()
    @IsNotEmpty()
    title: string;
}