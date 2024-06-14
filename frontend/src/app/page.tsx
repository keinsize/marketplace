import type {
	IProductResponse,
	IQueriesToGetProducts
} from '@/types/product.types'

import { Main } from './Main'

export default async function Home({ searchParams }: Props) {
	const limit = searchParams.limit
		? parseInt(searchParams.limit)
		: parseInt(process.env.PRODUCTS_LIMIT!)
	const data = await getProducts({
		query: searchParams.query || '',
		limit: limit.toString()
	})

	return (
		<Main
			data={data}
			searchParams={{ limit, query: searchParams.query }}
		/>
	)
}

export async function getProducts(
	data: IQueriesToGetProducts
): Promise<IProductResponse> {
	const query = new URLSearchParams(data)
	return fetch(`${process.env.SERVER_URL}/products?${query}`, {
		next: { revalidate: 60 }
	}).then(data => data.json())
}
