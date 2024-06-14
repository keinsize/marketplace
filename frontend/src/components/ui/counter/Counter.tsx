import styles from './Counter.module.scss'

export function Counter({ count }: { count: number }) {
	return <div className={styles.counter}>{count}</div>
}
