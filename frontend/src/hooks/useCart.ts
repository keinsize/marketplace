import { useQuery } from '@tanstack/react-query'

import { UsersService } from '@/services/users/users.service'

export const useCart = () => {
	const { data: cart } = useQuery({
		queryKey: ['cart'],
		queryFn: () => UsersService.getCart(),
		select: ({ data }) => data.cart
	})

	return { cart }
}
