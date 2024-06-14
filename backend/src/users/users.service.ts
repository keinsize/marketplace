import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { getPaymentSystem } from 'src/utils/getPaymentSystem'
import { CreditCardDto, UserDto } from './dto/users.dto'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: AuthDto) {
		const isUserWithThisEmailExists = await this.prisma.user.findUnique({
			where: { email: data.email }
		})
		if (isUserWithThisEmailExists)
			throw new BadRequestException(
				'The user with this email address has already been registered'
			)

		data.password = await hash(data.password)
		data.name = data.email.split('@')[0]

		return this.prisma.user.create({ data })
	}

	async update(id: string, data: UserDto) {
		const user = await this.prisma.user.findUnique({ where: { id } })
		if (!user) throw new NotFoundException('The user was not found')
		const isUserWithThisEmailExists = await this.prisma.user.findUnique({
			where: { email: data.email }
		})
		if (isUserWithThisEmailExists && isUserWithThisEmailExists.id !== id)
			throw new BadRequestException(
				'The user with this email address has already been registered'
			)

		data.password = data.password ? await hash(data.password) : undefined

		await this.prisma.user.update({ where: { id }, data })
		return true
	}

	async delete(id: string) {
		try {
			await this.prisma.user.delete({ where: { id } })
		} catch ({ code }) {
			if (code === 'P2025')
				throw new NotFoundException('The user was not found')
		}
		return true
	}

	async addMoneyToBalance(id: string, count: number) {
		const user = await this.prisma.user.findUnique({ where: { id } })
		if (!user) throw new NotFoundException('The user was not found')

		await this.prisma.user.update({
			where: { id },
			data: { balance: { increment: count } }
		})
		return true
	}

	async removeMoneyFromBalance(id: string, count: number) {
		const user = await this.prisma.user.findUnique({ where: { id } })
		if (!user) throw new NotFoundException('The user was not found')

		await this.prisma.user.update({
			where: { id },
			data: { balance: { decrement: count } }
		})
		return true
	}

	async getProductsFromCart(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			select: {
				cart: {
					include: {
						product: true
					},
					orderBy: {
						createdAt: 'desc'
					}
				}
			}
		})
	}

	async addProductToCart(id: string, productId: string) {
		await this.prisma.cartItem.upsert({
			where: {
				ownerId_productId: {
					productId,
					ownerId: id
				}
			},
			create: {
				product: { connect: { id: productId } },
				owner: { connect: { id } }
			},
			update: {
				count: { increment: 1 }
			}
		})

		return true
	}

	async removeProductFromCart(id: string, productId: string) {
		await this.prisma.cartItem.update({
			where: {
				ownerId_productId: {
					productId,
					ownerId: id
				}
			},
			data: {
				count: {
					decrement: 1
				}
			}
		})

		await this.prisma.cartItem.deleteMany({
			where: {
				ownerId: id,
				count: 0,
				productId: productId
			}
		})

		return true
	}

	async getFavoriteProducts(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			select: { favoriteProducts: true }
		})
	}

	async toggleFavoriteProduct(id: string, productId: string) {
		const { favoriteProducts } = await this.prisma.user.findUnique({
			where: { id: id },
			select: { favoriteProducts: { where: { id: productId } } }
		})

		favoriteProducts.length
			? await this.prisma.user.update({
					where: { id },
					data: {
						favoriteProducts: {
							disconnect: {
								id: productId
							}
						}
					}
				})
			: await this.prisma.user.update({
					where: { id },
					data: {
						favoriteProducts: {
							connect: {
								id: productId
							}
						}
					}
				})

		return true
	}

	async getPurchases(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			select: { myPurchases: true }
		})
	}

	async makeAdmin(id: string) {
		await this.prisma.user.update({ where: { id }, data: { isAdmin: true } })
		return true
	}

	async removeAdmin(id: string) {
		await this.prisma.user.update({ where: { id }, data: { isAdmin: false } })
		return true
	}

	async getCards(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			select: { cards: true }
		})
	}

	async addCard(id: string, data: CreditCardDto) {
		data.paymentSystem = await getPaymentSystem(data.number)
		await this.prisma.card.create({
			data: { ...data, owner: { connect: { id } } }
		})
		return true
	}

	async removeCard(id: string, cardId: string) {
		await this.prisma.card.delete({ where: { id: cardId, ownerId: id } })
		return true
	}

	async getAll(email?: string) {
		return this.prisma.user.findMany({
			where: { email: { contains: email, mode: 'insensitive' } },
			orderBy: { createdAt: 'desc' },
			select: {
				id: true,
				name: true,
				email: true,
				createdAt: true,
				shop: true,
				avatar: true,
				balance: true,
				isAdmin: true
			}
		})
	}

	async getById(id: string) {
		const { password, ...user } = await this.prisma.user.findUnique({
			where: { id },
			include: {
				shop: {
					select: {
						name: true,
						slug: true
					}
				}
			}
		})
		if (!user) throw new NotFoundException('The user was not found')
		return user
	}

	async getByEmail(email: string) {
		const user = this.prisma.user.findUnique({ where: { email } })
		if (!user) throw new NotFoundException('The user was not found')
		return user
	}
}
