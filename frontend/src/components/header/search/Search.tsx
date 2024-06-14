'use client'

import Link from 'next/link'

import SearchField from '@/components/ui/search-field/SearchField'

import styles from './Search.module.scss'
import { useSearch } from './hooks/useSearch'

export function Search() {
	const { handleSearch, productNames, searchTerm, submitSearch } = useSearch()

	return (
		<div className={styles.wrapper}>
			<SearchField
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				submitSearch={submitSearch}
			/>
			{productNames && (
				<div className={styles.list}>
					{productNames.map(productName => (
						<Link
							key={productName.id}
							href={{
								pathname: '/',
								query: { query: productName.name }
							}}
						>
							{productName.name}
						</Link>
					))}
				</div>
			)}
		</div>
	)
}
