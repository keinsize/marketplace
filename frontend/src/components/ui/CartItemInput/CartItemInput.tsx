import { useQueryClient } from '@tanstack/react-query'
import cn from 'clsx'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import styles from './CartItemInput.module.scss'
import { UsersService } from '@/services/users/users.service'

export function CartItemInput({
	productId,
	value,
	className
}: {
	productId: string
	value: number
	className?: string
}) {
	const queryClient = useQueryClient()

	return (
		<div className={cn(styles.field, className)}>
			<div
				className={styles.minus}
				onClick={() =>
					UsersService.deleteProductFromCart(productId).then(() =>
						queryClient.invalidateQueries({ queryKey: ['cart'] })
					)
				}
			>
				<AiOutlineMinus />
			</div>
			<div className={styles.value}>{value}</div>
			<div
				className={styles.plus}
				onClick={() =>
					UsersService.addProductToCart(productId).then(() =>
						queryClient.invalidateQueries({ queryKey: ['cart'] })
					)
				}
			>
				<AiOutlinePlus />
			</div>
		</div>
	)
}
