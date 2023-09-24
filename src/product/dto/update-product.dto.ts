import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Variant } from './variant.dto';

export class UpdateProductDTO {
    @ApiProperty({ name: 'id', nullable: false, example: '986075332655' })
    @IsNotEmpty()
    @Expose({ name: 'id' })
    productId: number;

    @ApiProperty({ nullable: false, example: '(D) HILLS LONGLINE CREW 2' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional({ example: 'color|grey, season|04' })
    @IsOptional()
    @IsString()
    tags: string;

    @ApiProperty({ type: () => Variant, isArray: true })
    @IsArray()
    @IsOptional()
    @Type(() => Variant)
    @ValidateNested({ each: true })
    variants: Variant[];
}

