'use client'

import { Button } from '@/components/ui/form/button/Button'

import { useCart } from '@/hooks/useCart'

import { formatToCurrency } from '@/utils/format-to-currency'

import styles from './Cart.module.scss'
import { CartItem } from './CartItem/CartItem'

export function Cart() {
	const { cart } = useCart()

	return (
		<>
			<h1>Cart</h1>
			<div className={styles.container}>
				<div className={styles.list}>
					{cart?.length ? (
						cart.map(cartItem => (
							<CartItem
								cartItem={cartItem}
								key={cartItem.id}
							/>
						))
					) : (
						<span className={styles.empty}>Cart is empty</span>
					)}
				</div>
				<div className={styles.info}>
					<div className={styles.count}>
						<span>Products</span>
						<span>
							{cart ? cart.reduce((acc, item) => acc + item.count, 0) : 0}
						</span>
					</div>
					<div className={styles.totalOldPrice}>
						<span>Price</span>
						<span>
							{formatToCurrency(
								cart
									? cart.reduce(
											(acc, item) =>
												acc +
												item.count *
													(item.product.oldPrice &&
													item.product.oldPrice > item.product.price
														? item.product.oldPrice
														: item.product.price),
											0
										)
									: 0
							)}
						</span>
					</div>
					<div className={styles.totalOldPrice}>
						<span>Discount</span>
						<span>
							{formatToCurrency(
								cart
									? cart.reduce(
											(acc, item) =>
												acc +
												item.count *
													(item.product.oldPrice &&
													item.product.oldPrice > item.product.price
														? item.product.oldPrice - item.product.price
														: 0),
											0
										)
									: 0
							)}
						</span>
					</div>
					<div className={styles.total}>
						<span>Total</span>
						<span>
							{formatToCurrency(
								cart
									? cart.reduce(
											(acc, item) => acc + item.count * item.product.price,
											0
										)
									: 0
							)}
						</span>
					</div>
					<Button className={styles.order}>To order</Button>
				</div>
			</div>
		</>
	)
}
