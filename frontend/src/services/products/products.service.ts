import {
	IGetSearchProductNames,
	IProduct,
	IProductEdit,
	IQueriesToGetProducts
} from '@/types/product.types'

import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

export const ProductsService = {
	async create() {
		return axiosWithAuth.post<boolean>('/products')
	},

	async update(id: string, data: IProductEdit) {
		return axiosWithAuth.put<boolean>(`/products/${id}`, data)
	},

	async delete(id: string) {
		return axiosWithAuth.delete<boolean>(`/products/${id}`)
	},

	async updateCountOpened(id: string) {
		return axiosClassic.post<boolean>('/products/update-count-opened', { id })
	},

	async getProductNames(data: IGetSearchProductNames) {
		return axiosClassic.get<Pick<IProduct, 'id' | 'name'>[]>(
			'/products/search',
			{
				params: { ...data }
			}
		)
	},

	async getById(id: string) {
		return axiosClassic.get<IProduct>(`/products/${id}`)
	},

	async getProducts(data?: IQueriesToGetProducts) {
		return axiosClassic.get<IProduct[]>('/products', {
			params: data ? { ...data } : {}
		})
	}
}
