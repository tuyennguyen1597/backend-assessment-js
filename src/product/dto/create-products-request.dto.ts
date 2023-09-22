import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateProductRequestDTO } from "./create-product-request.dto";

export class CreateProductsRequestDTO {
    @IsArray()
    @IsNotEmpty()
    @Type(() => CreateProductRequestDTO)
    @ValidateNested({ each: true })
    products: CreateProductRequestDTO[]
}