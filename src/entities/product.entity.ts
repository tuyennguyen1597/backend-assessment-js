import { Entity, Column, Index, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'products' })
@Unique('product_variant_unique', ['productId', 'variantId'])
@Index('product_id_index', ['productId'])
export class Product extends BaseEntity {
    @Column({ name: 'product_id' })
    productId: number;

    @Column({ name: 'variant_id' })
    variantId: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    tags: string;

    @Column()
    sku: string;
}