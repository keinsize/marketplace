'use client'

import { ProductsTable } from '@/components/ui/products/products-table/ProductsTable'

import { useFavorites } from '@/hooks/useFavorites'

export function Favorites() {
	const { favorites } = useFavorites()

	return favorites?.length ? (
		<ProductsTable products={favorites} />
	) : (
		<span className='text-xl mt-5 block'>Favorites is empty</span>
	)
}
