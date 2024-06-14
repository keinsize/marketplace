import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { IProduct } from '@/types/product.types'

import { formatToCurrency } from '@/utils/format-to-currency'

import { Score } from '../../score/Score'

import styles from './ProductItem.module.scss'

export function ProductItem({ product }: { product: IProduct }) {
	return (
		<div className={styles.item}>
			<Image
				draggable={false}
				className={styles.photo}
				src={product.images[0]}
				alt={product.name}
				width={180}
				height={180}
			/>
			<p className={styles.name}>{product.name}</p>
			<div
				className={cn(styles.info, {
					[styles.priceCenter]:
						product.oldPrice > product.price || product.reviewsScore
				})}
			>
				<p className={styles.price}>{formatToCurrency(product.price)}</p>
				{(product.oldPrice || product.reviewsScore) && (
					<div className={styles.right}>
						{product.oldPrice > product.price && (
							<p className={styles.oldPrice}>
								{formatToCurrency(product.oldPrice)}
							</p>
						)}
						{product.reviewsScore && (
							<div className={styles.reviews}>
								<Score score={product.reviewsScore} />
							</div>
						)}
					</div>
				)}
			</div>
			<Link
				href={`/products/${product.id}`}
				className={styles.button}
			>
				Go to Product
			</Link>
		</div>
	)
}
