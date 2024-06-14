import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Deliveries'
}

export default function Page() {
	return notFound()
}
