'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiBasket } from 'react-icons/bi'
import { TbTruckDelivery } from 'react-icons/tb'

import { AuthButton } from '@/components/ui/auth-button/AuthButton'
import { Counter } from '@/components/ui/counter/Counter'
import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader'

import { useCart } from '@/hooks/useCart'
import { useFavorites } from '@/hooks/useFavorites'
import { useProfile } from '@/hooks/useProfile'

import { formatToCurrency } from '@/utils/format-to-currency'

import styles from './Menu.module.scss'

export function Menu() {
	const { profile, isLoading } = useProfile()
	const { favorites } = useFavorites()
	const { cart } = useCart()

	return (
		<div className={styles.menu}>
			{!isLoading ? (
				profile ? (
					<>
						<Link
							href='/profile'
							className={styles.profile}
						>
							<Image
								unoptimized
								priority
								draggable={false}
								src={profile.avatar}
								fill
								alt='avatar image'
							/>
						</Link>
						<Link
							aria-label='cart'
							href='/profile/cart'
						>
							<BiBasket />
							<Counter count={cart?.length || 0} />
						</Link>
						<Link
							aria-label='favorites'
							href='/profile/favorites'
						>
							<AiOutlineHeart />
							<Counter count={favorites?.length || 0} />
						</Link>
						<Link
							aria-label='delivery'
							href='/profile/deliveries'
						>
							<TbTruckDelivery />
						</Link>
						<div className={styles.balance}>
							{formatToCurrency(profile.balance)}
						</div>
					</>
				) : (
					<AuthButton />
				)
			) : (
				<div className={styles.loading}>
					<SkeletonLoader
						className={styles.circles}
						height={40}
						width={40}
						count={4}
					/>
					<SkeletonLoader
						className={styles.balance}
						height={30}
						width={90}
						count={1}
					/>
				</div>
			)}
		</div>
	)
}
