-- Create Table
CREATE TABLE `products` (
`id` varchar(36) NOT NULL,
`product_id` BIGINT UNSIGNED NOT NULL,
`variant_id` BIGINT UNSIGNED NOT NULL,
`title` varchar(255) NOT NULL,
`tags` varchar(255) NULL,
`sku` varchar(255) NOT NULL,
`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
UNIQUE INDEX `product_variant_unique` (`product_id`, `variant_id`),
INDEX `idx_product_id` (`product_id`),
PRIMARY KEY (`id`)
) ENGINE=InnoDB;
