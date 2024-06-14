import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { CategoriesService } from '@/services/categories/categories.service'

export function useCategories() {
	const { data: categories, error } = useQuery({
		queryKey: ['categories'],
		queryFn: () => CategoriesService.getAll(),
		select: ({ data }) => data
	})

	if (error) toast.error('An error occurred while loading categories.')

	return { categories }
}
