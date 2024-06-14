'use client'

import cn from 'clsx'
import Link from 'next/link'

import { BurgerMenu } from '@/components/ui/burger-menu/BurgerMenu'

import { useOutside } from '@/hooks/useOutside'

import styles from './Catalog.module.scss'
import { useCategories } from './hooks/useCategories'

export function Catalog() {
	const { isShow, ref, setIsShow } = useOutside(false)
	const { categories } = useCategories()

	return (
		<div
			className={styles.catalog}
			ref={ref}
		>
			<button onClick={() => setIsShow(state => !state)}>
				<BurgerMenu
					className={cn({
						[styles.open]: isShow
					})}
				/>
				<span>Catalog</span>
			</button>
			{isShow && (
				<div className={styles.list}>
					{categories &&
						categories.map(category => (
							<Link
								onClick={() => setIsShow(false)}
								key={category.id}
								href={`/categories/${category.slug}`}
							>
								{category.name}
							</Link>
						))}
				</div>
			)}
		</div>
	)
}
