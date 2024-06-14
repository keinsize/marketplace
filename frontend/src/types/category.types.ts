import { IProductResponse } from './product.types'

export interface ICategory {
	id: string
	name: string
	slug: string
}

export interface ICategoryResponse {
	id: string
	name: string
	slug: string
	products: IProductResponse
}
