import { ChangeEvent, FormEvent } from 'react'
import { IoSearch } from 'react-icons/io5'

import styles from './SearchField.module.scss'

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
	submitSearch: (event: FormEvent<HTMLFormElement>) => void
}

export function SearchField({
	handleSearch,
	searchTerm,
	submitSearch
}: ISearchField) {
	return (
		<form
			className={styles.search}
			onSubmit={submitSearch}
		>
			<input
				placeholder='Search'
				value={searchTerm}
				onChange={handleSearch}
			/>
			<button
				type='submit'
				title='search'
			>
				<IoSearch />
			</button>
		</form>
	)
}

export default SearchField
