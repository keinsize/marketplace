export interface IReview {
	id: string
	createdAt: string
	score: number
	comment: string
	productId: string
	owner: {
		id: string
		name: string
		avatar: string
	}
}
