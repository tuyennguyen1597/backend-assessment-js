import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateProductRequestDTO } from "./create-product-request.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductsRequestDTO {
    @ApiProperty({ type: () => CreateProductRequestDTO, isArray: true, nullable: false })
    @IsArray()
    @IsNotEmpty()
    @Type(() => CreateProductRequestDTO)
    @ValidateNested({ each: true })
    products: CreateProductRequestDTO[]
}