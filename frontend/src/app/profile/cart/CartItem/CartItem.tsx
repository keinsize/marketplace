import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { CartItemInput } from '@/components/ui/CartItemInput/CartItemInput'

import { ICartItem } from '@/types/user.types'

import { formatToCurrency } from '@/utils/format-to-currency'

import styles from './CartItem.module.scss'

export function CartItem({ cartItem }: { cartItem: ICartItem }) {
	const ref = useRef<HTMLDivElement>(null)
	const { push } = useRouter()

	return (
		<div
			ref={ref}
			onClick={e => {
				push(`/products/${cartItem.product.id}`)
			}}
			className={styles.cartItem}
		>
			<Image
				src={cartItem.product.images[0]}
				alt=''
				width={150}
				height={150}
			/>
			<div className={styles.info}>
				<div className={styles.name}>{cartItem.product.name}</div>
				<div
					className={styles.price}
					onClick={e => e.stopPropagation()}
				>
					<div>{formatToCurrency(cartItem.product.price * cartItem.count)}</div>
					<CartItemInput
						productId={cartItem.product.id}
						value={cartItem.count}
					/>
					{cartItem.count > 1 && (
						<div className={styles.oneProductPrice}>
							{formatToCurrency(cartItem.product.price)}/product
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
