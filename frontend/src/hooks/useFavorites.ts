import { useQuery } from '@tanstack/react-query'

import { UsersService } from '@/services/users/users.service'

export const useFavorites = () => {
	const { data: favorites } = useQuery({
		queryKey: ['favorites'],
		queryFn: () => UsersService.getFavorites(),
		select: ({ data }) => data.favoriteProducts
	})

	return { favorites }
}
