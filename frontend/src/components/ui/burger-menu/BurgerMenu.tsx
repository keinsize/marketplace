import cn from 'clsx'
import { HTMLAttributes } from 'react'

import styles from './BurgerMenu.module.scss'

export function BurgerMenu({ className }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn(styles.menu, className)}>
			<span />
		</div>
	)
}
