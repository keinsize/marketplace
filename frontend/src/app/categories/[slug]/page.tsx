import { notFound } from 'next/navigation'

import { ICategory, ICategoryResponse } from '@/types/category.types'
import { IQueriesToGetProducts } from '@/types/product.types'

import { CategoryProducts } from './CategoryProducts'

export async function generateMetadata({ params }: Props) {
	const category: ICategory = await fetch(
		`${process.env.SERVER_URL}/categories/${params.slug}`,
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
		title: category.name
	}
}
export default async function Page({ params, searchParams }: Props) {
	const limit = searchParams.limit
		? parseInt(searchParams.limit)
		: parseInt(process.env.PRODUCTS_LIMIT!)
	const page = searchParams.page ? parseInt(searchParams.page) : 1
	const data = await getProductsByCategory(params.slug, {
		page: page.toString(),
		limit: limit.toString()
	})

	return (
		<CategoryProducts
			data={data}
			searchParams={{ limit, page }}
		/>
	)
}

export async function generateStaticParams() {
	const categories: ICategory[] = await fetch(
		`${process.env.SERVER_URL}/categories`,
		{ next: { revalidate: 60 } }
	).then(res => res.json())

	return categories.map(category => ({
		slug: category.slug
	}))
}

async function getProductsByCategory(
	slug: string,
	data: Omit<IQueriesToGetProducts, 'query'>
): Promise<ICategoryResponse> {
	const query = new URLSearchParams(data)
	return fetch(
		`${process.env.SERVER_URL}/categories/withProducts/${slug}?${query}`,
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
