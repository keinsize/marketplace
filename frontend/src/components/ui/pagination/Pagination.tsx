'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

import styles from './Pagination.module.scss'

export function Pagination({
	currentPage,
	totalCount,
	limit
}: {
	currentPage: number
	totalCount: number
	limit: number
}) {
	const { replace } = useRouter()
	const pathname = usePathname()
	const totalPages = Math.ceil(totalCount / limit)
	const searchParams = useSearchParams()

	const changePage = (page: number) => {
		const params = new URLSearchParams(searchParams)
		params.set('page', page.toString())
		replace(`${pathname}?${params.toString()}`)
	}

	const getVisiblePages = () => {
		const startPage = Math.max(1, currentPage - 2)
		const endPage = Math.min(totalPages, currentPage + 2)
		return Array.from(
			{ length: endPage - startPage + 1 },
			(_, i) => startPage + i
		)
	}

	return (
		<div className={styles.pagination}>
			<button
				className={styles.prev}
				onClick={() => changePage(currentPage - 1)}
				disabled={currentPage === 1}
				aria-label='previous page'
			>
				<GrFormPrevious />
			</button>
			{getVisiblePages().map(page => (
				<button
					key={page}
					onClick={() => changePage(page)}
					className={currentPage === page ? styles.active : ''}
				>
					{page}
				</button>
			))}
			<button
				onClick={() => changePage(currentPage + 1)}
				className={styles.next}
				disabled={currentPage === totalPages}
				aria-label='next page'
			>
				<GrFormNext />
			</button>
		</div>
	)
}
