'use client'

import { Pagination } from '@/components/ui/pagination/Pagination'
import { ProductsTable } from '@/components/ui/products/products-table/ProductsTable'

import { ICategoryResponse } from '@/types/category.types'

interface ICategoryProducts {
	searchParams: {
		limit: number
		page: number
	}
	data: ICategoryResponse
}

export function CategoryProducts({ data, searchParams }: ICategoryProducts) {
	return (
		<>
			<h1>{data.name}</h1>
			<ProductsTable products={data.products.items} />
			{searchParams.limit < data.products.totalCount && (
				<Pagination
					currentPage={searchParams.page}
					limit={searchParams.limit}
					totalCount={data.products.totalCount}
				/>
			)}
		</>
	)
}
