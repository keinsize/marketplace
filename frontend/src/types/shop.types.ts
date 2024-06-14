import { IProductResponse } from './product.types'

export interface IShop {
	id: string
	createdAt: string
	name: string
	slug: string
	profit: number
	sales: number
	deliveryTime: number
	ownerId: string
}

export interface IShopEdit {
	name: string
}

export interface IShopResponse extends IShop {
	products: IProductResponse
}
