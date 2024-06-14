import { IReview } from './reviews.types'

export interface IProduct {
	id: string
	createdAt: string
	name: string
	description: string
	images: string[]
	price: number
	oldPrice: number
	countOpened: number
	categoryId: string
	shopId: string
	reviewsScore: number
}

export interface IProductWithReviews extends IProduct {
	reviews: IReview[]
}

export interface IProductEdit {
	name: string
	description: string
	images: string[]
	price: number
	categoryId: string
}

export interface IGetSearchProductNames {
	searchSuggest: string
	limit?: number
}

export type IQueriesToGetProducts = {
	query?: string
	limit?: string
	page?: string
}

export interface IProductResponse {
	items: IProduct[]
	totalCount: number
}
