import { Entity, Column, Index, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'products' })
@Unique('product_variant_unique', ['productId', 'variantId'])
@Index('product_id_index', ['productId'])
export class Product extends BaseEntity {
    @Column({ name: 'product_id' })
    productId: string;

    @Column({ name: 'variant_id' })
    variantId: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    tags: string;

    @Column()
    sku: string;
}