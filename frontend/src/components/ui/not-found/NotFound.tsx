import styles from './NotFound.module.scss'
import { Svg } from './svg'

export function NotFound({ message }: { message: string }) {
	return (
		<div className={styles.notFound}>
			<div className={styles.message}>{message}</div>
			<Svg />
		</div>
	)
}
