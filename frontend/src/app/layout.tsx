import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { Header } from '@/components/header/Header'

import { SITE_NAME } from '@/config/config'

import './globals.scss'
import { Providers } from './providers'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description:
		'Everyday goods, electronics and thousands of other products with discounts and promotions.',
	icons: {
		shortcut: '/favicons/favicon.ico',
		apple: [
			{ sizes: '57x57', url: 'apple-touch-icon-57x57.png', type: 'image/png' },
			{ sizes: '72x72', url: 'apple-touch-icon-72x72.png', type: 'image/png' },
			{ sizes: '76x76', url: 'apple-touch-icon-76x76.png', type: 'image/png' },
			{
				sizes: '114x114',
				url: 'apple-touch-icon-114x114.png',
				type: 'image/png'
			},
			{
				sizes: '120x120',
				url: 'apple-touch-icon-120x120.png',
				type: 'image/png'
			},
			{
				sizes: '144x144',
				url: 'apple-touch-icon-144x144.png',
				type: 'image/png'
			},
			{
				sizes: '152x152',
				url: 'apple-touch-icon-152x152.png',
				type: 'image/png'
			},
			{
				sizes: '180x180',
				url: 'apple-touch-icon-180x180.png',
				type: 'image/png'
			}
		]
	}
}

export const viewport: Viewport = {
	initialScale: 1,
	width: 'device-width',
	themeColor: '#1E1E1E'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={outfit.className}>
				<Providers>
					<Header />
					<main>{children}</main>
					<ToastContainer
						position='bottom-right'
						autoClose={2000}
						hideProgressBar
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss={false}
						draggable
						pauseOnHover
						theme='dark'
						transition={Bounce}
					/>
				</Providers>
			</body>
		</html>
	)
}
