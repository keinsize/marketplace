'use client'

import cn from 'clsx'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineShop } from 'react-icons/ai'

import { Review } from '@/components/ui/review/Review'
import { Score } from '@/components/ui/score/Score'
import { ProductsSwiper } from '@/components/ui/swiper/ProductsSwiper'

import { IProductWithReviews } from '@/types/product.types'
import { IShop } from '@/types/shop.types'

import { useCart } from '@/hooks/useCart'
import { useFavorites } from '@/hooks/useFavorites'
import { useProfile } from '@/hooks/useProfile'

import { getDate } from '@/utils/format-date'
import { formatToCurrency } from '@/utils/format-to-currency'

import { ICartItemPage } from './CartItem'
import { IFavoritePage } from './Favorite'
import styles from './Product.module.scss'

const CartItem = dynamic<ICartItemPage>(
	() => import('./CartItem').then(mod => mod.CartItem),
	{ ssr: false }
)
const Favorite = dynamic<IFavoritePage>(
	() => import('./Favorite').then(mod => mod.Favorite),
	{ ssr: false }
)

export function Product({
	product,
	shop
}: {
	product: IProductWithReviews
	shop: IShop
}) {
	const [section, setSection] = useState<'description' | 'reviews'>(
		'description'
	)

	const { profile } = useProfile()
	const cartItem = useCart().cart?.find(x => x.productId === product.id)
	const isFavorite = useFavorites().favorites?.find(x => x.id === product.id)

	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<div className={styles.left}>
					<h1>{product.name}</h1>
					<ProductsSwiper
						className={styles.swiper}
						product={product}
					/>
				</div>
				<div className={styles.right}>
					<Favorite
						profile={!!profile}
						productId={product.id}
						isFavorite={!!isFavorite}
					/>
					<div className={styles.info}>
						<div className={styles.price}>
							<span className={styles.current}>
								{formatToCurrency(product.price)}
							</span>
							{product.oldPrice > product.price && (
								<>
									<span className={styles.old}>
										{formatToCurrency(product.oldPrice)}
									</span>
									<span className={styles.discount}>
										-
										{(
											((product.oldPrice - product.price) / product.oldPrice) *
											100
										).toFixed()}
										%
									</span>
								</>
							)}
						</div>
						<CartItem
							profile={!!profile}
							productId={product.id}
							cartItem={cartItem}
						/>
						{shop && (
							<>
								<div className={styles.delivery}>
									<span>Delivery</span>
									<span>{getDate(shop.deliveryTime)}</span>
								</div>
								<Link
									href={`/shops/${shop.slug}`}
									className={styles.shop}
								>
									<AiOutlineShop />
									<span>{shop.name}</span>
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
			<div className={styles.other}>
				<div className={styles.headers}>
					<button
						onClick={() => setSection('description')}
						className={cn({ [styles.active]: section === 'description' })}
					>
						About product
					</button>
					{!!product.reviews.length && (
						<button
							onClick={() => setSection('reviews')}
							className={cn({ [styles.active]: section === 'reviews' })}
						>
							Reviews
						</button>
					)}
					{section === 'reviews' && (
						<div className={styles.score}>
							<span>{product.reviewsScore}/5</span>
							<Score score={product.reviewsScore} />
						</div>
					)}
				</div>
				<div className={styles.content}>
					{section === 'description' ? (
						<div className={styles.description}>{product.description}</div>
					) : (
						<div className={styles.reviews}>
							{product.reviews.map(review => (
								<Review
									review={review}
									key={review.id}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
