export const formatDate = (date: string) =>
	new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})

export const getDate = (deliveryTime: number) => {
	const date = new Date()
	date.setDate(date.getDate() + deliveryTime)
	return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })
}
