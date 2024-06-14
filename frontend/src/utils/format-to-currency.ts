export const formatToCurrency = (price: number) =>
	new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 2
	}).format(price)
