import { ICategory } from '@/types/category.types'

import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

export const CategoriesService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<ICategory[]>('/categories', {
			params: searchTerm ? { searchTerm } : {}
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<ICategory>(`/categories/${slug}`)
	},

	async create() {
		return axiosWithAuth.post<boolean>('categories')
	},

	async delete(_id: string) {
		return axiosWithAuth.delete<boolean>('categories')
	}
}
