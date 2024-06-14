import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'

import { ProductsService } from '@/services/products/products.service'

export function useSearch() {
	const searchParams = useSearchParams()
	const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '')
	const debouncedSearch = useDebounce(searchTerm, 500)
	const { replace } = useRouter()

	useEffect(() => {
		setSearchTerm(searchParams.get('query') || '')
	}, [searchParams.get('query')])

	const { data: productNames } = useQuery({
		queryKey: ['search product list', debouncedSearch],
		queryFn: () =>
			ProductsService.getProductNames({
				searchSuggest: debouncedSearch,
				limit: 10
			}),
		select: ({ data }) => data,
		enabled: !!debouncedSearch
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const submitSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const params = new URLSearchParams(searchParams)
		if (searchTerm) {
			params.set('query', searchTerm)
		} else {
			params.delete('query')
		}
		replace(`/?${params.toString()}`)
	}

	return { productNames, handleSearch, searchTerm, submitSearch }
}
