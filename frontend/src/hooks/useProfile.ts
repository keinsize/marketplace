import { useQuery } from '@tanstack/react-query'

import { UsersService } from '@/services/users/users.service'

export const useProfile = () => {
	const { data: profile, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => UsersService.getProfile(),
		select: ({ data }) => data
	})

	return { profile, isLoading }
}
