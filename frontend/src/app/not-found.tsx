import type { Metadata } from 'next'

import { NotFound } from '@/components/ui/not-found/NotFound'

export const metadata: Metadata = {
	title: 'Page not found'
}

export default function notFound() {
	return (
		<div>
			<NotFound message='Page not found' />
		</div>
	)
}
