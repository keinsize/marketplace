import { ICard } from '@/types/card.types'
import { IProduct } from '@/types/product.types'
import { ICartItem, IUser, IUserEdit } from '@/types/user.types'

import { axiosWithAuth } from '@/api/interceptors'

export const UsersService = {
	async updateProfile(data: IUserEdit) {
		return axiosWithAuth.put<boolean>('/users/profile', data)
	},

	async updateUser(id: string, data: IUserEdit) {
		return axiosWithAuth.put<boolean>(`/users/${id}`, data)
	},

	async deleteUser(id: string) {
		return axiosWithAuth.delete<boolean>(`/users/${id}`)
	},

	async getCart() {
		return axiosWithAuth.get<{ cart: ICartItem[] }>('/users/cart')
	},

	async addProductToCart(productId: string) {
		return axiosWithAuth.post<boolean>('/users/cart', { productId })
	},

	async deleteProductFromCart(productId: string) {
		return axiosWithAuth.delete<boolean>(`/users/cart/${productId}`)
	},

	async getFavorites() {
		return axiosWithAuth.get<{ favoriteProducts: IProduct[] }>(
			'/users/favorites'
		)
	},

	async toggleFavorite(productId: string) {
		return axiosWithAuth.put<boolean>('/users/favorites', {
			productId
		})
	},

	async makeAdmin(id: string) {
		return axiosWithAuth.post<boolean>(`/users/admin/${id}`)
	},

	async removeAdmin(id: string) {
		return axiosWithAuth.delete<boolean>(`/users/admin/${id}`)
	},

	async getCards() {
		return axiosWithAuth.get<ICard[]>('/users/cards')
	},

	async addCard(data: ICard) {
		return axiosWithAuth.post<boolean>('/users/cards', data)
	},

	async removeCard(id: string) {
		return axiosWithAuth.delete<boolean>(`/users/cards/${id}`)
	},

	async getUsers(email?: string) {
		return axiosWithAuth.get<IUser[]>('/users', {
			params: email ? { email } : {}
		})
	},

	async getProfile() {
		return axiosWithAuth.get<IUser>('/users/profile')
	},

	async getUser(id: string) {
		return axiosWithAuth.get<IUser>(`/users/${id}`)
	},

	async getCounts() {
		return axiosWithAuth.get<{
			_count: {
				cards: number
				cart: number
				favoriteProducts: number
				myPurchases: number
				reviews: number
			}
		}>('/users/counts')
	}
}
