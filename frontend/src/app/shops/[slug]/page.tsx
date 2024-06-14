import { notFound } from 'next/navigation'

import { IQueriesToGetProducts } from '@/types/product.types'
import { IShop, IShopResponse } from '@/types/shop.types'

import { Shop } from './Shop'

export async function generateMetadata({ params }: Props) {
	const shop: IShop = await fetch(
		`${process.env.SERVER_URL}/shops/slug/${params.slug}`,
		{
			next: { revalidate: 60 }
		}
	).then(data => {
		if (!data.ok) {
			notFound()
		}
		return data.json()
	})

	return {
		title: shop.name
	}
}
export default async function Page({ params, searchParams }: Props) {
	const limit = searchParams.limit
		? parseInt(searchParams.limit)
		: parseInt(process.env.PRODUCTS_LIMIT!)
	const page = searchParams.page ? parseInt(searchParams.page) : 1
	const data = await getShop(params.slug, {
		page: page.toString(),
		limit: limit.toString()
	})

	return (
		<Shop
			data={data}
			searchParams={{ limit, page }}
		/>
	)
}

export async function generateStaticParams() {
	const shops: IShop[] = await fetch(`${process.env.SERVER_URL}/shops`, {
		next: { revalidate: 60 }
	}).then(res => res.json())

	return shops.map(shop => ({
		slug: shop.slug
	}))
}

async function getShop(
	slug: string,
	data: Omit<IQueriesToGetProducts, 'query'>
): Promise<IShopResponse> {
	const query = new URLSearchParams(data)
	return fetch(
		`${process.env.SERVER_URL}/shops/withProducts/${slug}?${query}`,
		{
			next: { revalidate: 60 }
		}
	).then(data => {
		if (!data.ok) {
			notFound()
		}
		return data.json()
	})
}
