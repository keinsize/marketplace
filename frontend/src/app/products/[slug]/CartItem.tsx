import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { CartItemInput } from '@/components/ui/CartItemInput/CartItemInput'
import { Button } from '@/components/ui/form/button/Button'

import { ICartItem } from '@/types/user.types'

import styles from './Product.module.scss'
import { UsersService } from '@/services/users/users.service'

export interface ICartItemPage {
	productId: string
	cartItem?: ICartItem
	profile: boolean
}

export function CartItem({ productId, cartItem, profile }: ICartItemPage) {
	const { replace } = useRouter()
	const queryClient = useQueryClient()

	return cartItem ? (
		<CartItemInput
			productId={cartItem.product.id}
			value={cartItem.count}
			className={styles.cartItem}
		/>
	) : (
		<Button
			onClick={() => {
				if (!profile) replace('/auth')
				else
					UsersService.addProductToCart(productId).then(() =>
						queryClient.invalidateQueries({ queryKey: ['cart'] })
					)
			}}
			className={styles.addToCart}
		>
			Add to cart
		</Button>
	)
}
