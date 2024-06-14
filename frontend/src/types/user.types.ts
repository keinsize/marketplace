import { IProduct } from './product.types'
import { IShop } from './shop.types'

export interface IUser {
	id: string
	createdAt: string
	name: string
	email: string
	avatar: string
	address: string
	balance: number
	isAdmin: boolean
	shop: Pick<IShop, 'slug' | 'name'>
}

export interface IUserEdit {
	name: string
	email: string
	password?: string
	address?: string
	avatar?: string
}

export interface ICartItem {
	id: string
	count: number
	ownerId: string
	productId: string
	product: IProduct
}
