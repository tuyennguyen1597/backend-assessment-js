import { IsNumber, IsOptional, IsString } from "class-validator"

export class FindProductDTO {
    @IsOptional()
    @IsString()
    id: string

    @IsOptional()
    @IsNumber()
    productId: number

    @IsOptional()
    @IsNumber()
    variantId: number
}