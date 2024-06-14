import type { Metadata } from 'next'

import { Cart } from './Cart'

export const metadata: Metadata = {
	title: 'Cart'
}

export default function Page() {
	return <Cart />
}
