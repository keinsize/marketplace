import cn from 'clsx'

import styles from './Loader.module.scss'

export function Loader({
	size = 48,
	className
}: {
	size?: number
	className?: string
}) {
	return (
		<span
			style={{
				width: size,
				height: size,
				border: `${size * 0.11}px solid #fff`
			}}
			className={cn(styles.loader, className)}
		></span>
	)
}
