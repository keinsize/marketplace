import cn from 'clsx'
import { ButtonHTMLAttributes } from 'react'

import styles from './button.module.scss'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, className, ...rest }: IButton) {
	return (
		<button
			className={cn(styles.button, className)}
			{...rest}
		>
			{children}
		</button>
	)
}
