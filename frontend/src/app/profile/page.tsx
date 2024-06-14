import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/config/config'

import { Profile } from './Profile'

export const metadata: Metadata = {
	title: 'Profile',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <Profile />
}
