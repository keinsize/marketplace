import { notFound } from 'next/navigation'

import {
	IProduct,
	IProductResponse,
	IProductWithReviews
} from '@/types/product.types'
import { IShop } from '@/types/shop.types'

import { Product } from './Product'

export async function generateMetadata({ params }: Props) {
	const product: IProduct = await fetch(
		`${process.env.SERVER_URL}/products/${params.slug}`,
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
		title: product.name
	}
}
export default async function Page({ params }: Props) {
	const { product, shop } = await getData(params.slug)

	return (
		<Product
			product={product}
			shop={shop}
		/>
	)
}

export async function generateStaticParams() {
	const products: IProductResponse = await fetch(
		`${process.env.SERVER_URL}/products`,
		{ next: { revalidate: 60 } }
	).then(res => res.json())

	return products.items.map(products => ({
		slug: products.id
	}))
}

async function getData(
	slug: string
): Promise<{ product: IProductWithReviews; shop: IShop }> {
	const product: IProductWithReviews = await fetch(
		`${process.env.SERVER_URL}/products/${slug}`,
		{
			next: { revalidate: 60 }
		}
	).then(data => {
		if (!data.ok) {
			notFound()
		}
		return data.json()
	})

	const shop: IShop = await fetch(
		`${process.env.SERVER_URL}/shops/${product.shopId}`,
		{
			next: { revalidate: 60 }
		}
	).then(data => {
		if (!data.ok) {
			notFound()
		}
		return data.json()
	})

	return { product, shop }
}
