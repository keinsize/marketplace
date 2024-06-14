import { Suspense } from 'react'

import styles from './Header.module.scss'
import { Logotype } from './Logotype'
import { Catalog } from './catalog/Catalog'
import { Menu } from './menu/Menu'
import { Search } from './search/Search'

export function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.left}>
				<Logotype />
				<Catalog />
			</div>
			<Suspense>
				<Search />
			</Suspense>
			<Menu />
		</header>
	)
}
