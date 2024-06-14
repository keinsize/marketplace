import type { Metadata } from 'next'

import { Favorites } from './Favorites'

export const metadata: Metadata = {
	title: 'Favorites'
}

export default function Page() {
	return (
		<>
			<h1>Favorites</h1>
			<Favorites />
		</>
	)
}
