import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { number, string } from 'yargs';
import { Variant } from './variant.dto';

export class CreateProductRequestDTO {
    @ApiProperty({
        name: 'id',
        type: number,
        example: '986075332655'
    })
    @IsNotEmpty()
    @Expose({ name: 'id' })
    productId: number;

    @ApiProperty({
        type: string,
        example: '(D) HILLS LONGLINE CREW 2'
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({
        type: string,
        example: 'color|grey, season|04'
    })
    @IsOptional()
    @IsString()
    tags: string;

    @ApiProperty({
        type: () => Variant, isArray: true 
    })
    @IsArray()
    @IsNotEmpty()
    @Type(() => Variant)
    @ValidateNested({ each: true })
    variants: Variant[];
}