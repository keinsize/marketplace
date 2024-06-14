/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
		PRODUCTS_LIMIT: process.env.PRODUCTS_LIMIT
	},
	typescript: {
		ignoreBuildErrors: true
	},
	reactStrictMode: false,
	poweredByHeader: false,
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `http://localhost:4200/api/:path*`
			},
			{
				source: '/uploads/:path*',
				destination: `http://localhost:4200/uploads/:path*`
			}
		]
	}
}

export default nextConfig
