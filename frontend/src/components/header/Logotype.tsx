import Image from 'next/image'
import Link from 'next/link'

import styles from './Header.module.scss'

export function Logotype() {
	return (
		<Link
			href='/'
			className={styles.logo}
		>
			<Image
				priority
				draggable={false}
				src='/logo.svg'
				width={48}
				height={48}
				alt='Logotype'
			/>
			<span>Marketplace</span>
		</Link>
	)
}
