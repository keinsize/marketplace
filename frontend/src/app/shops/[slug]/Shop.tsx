'use client'

import dynamic from 'next/dynamic'

import { Pagination } from '@/components/ui/pagination/Pagination'
import { ProductsTable } from '@/components/ui/products/products-table/ProductsTable'

import { IShopResponse } from '@/types/shop.types'

import { IHeader } from './Header'
import styles from './Shop.module.scss'

const Header = dynamic<IHeader>(
	() => import('./Header').then(mod => mod.Header),
	{ ssr: false }
)

interface IShop {
	searchParams: {
		limit: number
		page: number
	}
	data: IShopResponse
}

export function Shop({ data, searchParams }: IShop) {
	return (
		<div className={styles.container}>
			<Header shop={data} />
			<h1>The store's products</h1>
			<ProductsTable products={data.products.items} />
			{searchParams.limit < data.products.totalCount && (
				<Pagination
					currentPage={searchParams.page}
					limit={searchParams.limit}
					totalCount={data.products.totalCount}
				/>
			)}
		</div>
	)
}
