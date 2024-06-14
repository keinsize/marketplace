import type { Config } from 'tailwindcss'

const config: Config = {
	mode: 'jit',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				theme: '#1E1E1E',
				'light-theme': '#2E2E2E',
				primary: '#FFFFFF',
				secondary: '#1E1E1E',
				'dark-text': '#BBBBBB',
				red: '#FF0000'
			},
			keyframes: {
				fade: {
					from: { opacity: '0' },
					to: { opacity: '1' }
				}
			},
			animation: {
				fade: 'fade .2s ease-in-out'
			}
		}
	},
	plugins: []
}
export default config
