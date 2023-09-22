import { IsOptional, IsString } from "class-validator"

export class FindProductDTO {
    @IsOptional()
    @IsString()
    id: string

    @IsOptional()
    productId: string

    @IsOptional()
    variantId: string
}