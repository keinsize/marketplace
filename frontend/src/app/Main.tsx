'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

import { Loader } from '@/components/ui/loader/Loader'
import { ProductsTable } from '@/components/ui/products/products-table/ProductsTable'

import type { IProductResponse } from '@/types/product.types'

interface IMain {
	searchParams: {
		limit: number
		query?: string
	}
	data: IProductResponse
}

export function Main({ data, searchParams }: IMain) {
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (page === 1) return
		const query = new URLSearchParams({
			query: searchParams.query || '',
			limit: searchParams.limit.toString(),
			page: page.toString()
		})

		axios
			.get<IProductResponse>(`${process.env.SERVER_URL}/products?${query}`)
			.then(response => {
				data.items.push(...response.data.items)
				setLoading(false)
			})
	}, [page])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const handleScroll = async () => {
		if (
			document.documentElement.scrollHeight -
				(document.documentElement.scrollTop + window.innerHeight) <
				100 &&
			data.items.length < data.totalCount
		) {
			if (loading) return
			setLoading(true)
			setPage(prev => prev + 1)
		}
	}

	return (
		<>
			<h1>{searchParams.query || 'All products'}</h1>
			<ProductsTable products={data.items} />
			{loading && (
				<div className='flex justify-center mt-10'>
					<Loader size={32} />
				</div>
			)}
		</>
	)
}
