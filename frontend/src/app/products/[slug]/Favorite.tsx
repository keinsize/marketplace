import { useQueryClient } from '@tanstack/react-query'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import styles from './Product.module.scss'
import { UsersService } from '@/services/users/users.service'

export interface IFavoritePage {
	productId: string
	profile: boolean
	isFavorite?: boolean
}

export function Favorite({ productId, isFavorite, profile }: IFavoritePage) {
	const queryClient = useQueryClient()
	return (
		profile && (
			<button
				onClick={() =>
					UsersService.toggleFavorite(productId).then(() =>
						queryClient.invalidateQueries({ queryKey: ['favorites'] })
					)
				}
				className={styles.favorites}
			>
				<span>To favorites</span>
				{isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
			</button>
		)
	)
}
