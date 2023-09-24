import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class Variant {
    @ApiProperty({ name: 'id', nullable: false, example: '9510632914991' })
    @IsNotEmpty()
    @Expose({ name: 'id' })
    variantId: number

    @ApiProperty({ name: 'sku', nullable: true, example: '6495694.GRY~12~LN~4' })
    @IsString()
    @IsOptional()
    @Expose({ name: 'sku' })
    productCode: string;

    @ApiProperty({ nullable: true, example: 'Pink'})
    @IsString()
    @IsOptional()
    title: string;
}