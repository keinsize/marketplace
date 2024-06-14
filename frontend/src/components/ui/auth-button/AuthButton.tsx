import Link from 'next/link'
import { IoLogInOutline } from 'react-icons/io5'

import styles from './AuthButton.module.scss'

export function AuthButton() {
	return (
		<Link
			className={styles.auth}
			href='/auth'
		>
			<IoLogInOutline />
			<span>Login</span>
		</Link>
	)
}
