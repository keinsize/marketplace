'use client'

import { IProduct } from '@/types/product.types'

import { NotFound } from '../../not-found/NotFound'
import { ProductItem } from '../product-item/ProductItem'

import styles from './ProductsTable.module.scss'

export function ProductsTable({ products }: { products: IProduct[] }) {
	return products.length !== 0 ? (
		<div className={styles.table}>
			{products.map(product => (
				<ProductItem
					key={product.id}
					product={product}
				/>
			))}
		</div>
	) : (
		<div className={styles.notfound}>
			<NotFound message='No results were found for your request' />
		</div>
	)
}
