import { IShop, IShopEdit } from '@/types/shop.types'

import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

export const ShopsService = {
	async createOrUpdate(data: IShopEdit) {
		return axiosWithAuth.post<{ slug: string }>('/shops', data)
	},

	async delete(id: string) {
		return axiosWithAuth.delete<boolean>(`/shops/${id}`)
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IShop>(`/shops/${slug}`)
	},

	async getById(id: string) {
		return axiosClassic.get<IShop>(`/shops/${id}`)
	},

	async getAll() {
		return axiosClassic.get<IShop[]>('/shops')
	}
}
