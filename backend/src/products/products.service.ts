import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { User as UserModel } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import {
	GetProductsDto,
	GetSearchProductNamesDto,
	IProductsWithReviewsScore,
	ProductDto
} from './dto/products.dto'

@Injectable()
export class ProductsService {
	constructor(private readonly prisma: PrismaService) {}

	async create(userId: string, { categoryId, ...data }: ProductDto) {
		const { id: shopId } = await this.prisma.shop.findUnique({
			where: { ownerId: userId },
			select: { id: true }
		})
		if (!shopId)
			throw new BadRequestException(
				'You cannot add products because you are not the owner of the store.'
			)

		await this.prisma.product.create({
			data: {
				...data,
				category: { connect: { id: categoryId } },
				shop: { connect: { id: shopId } }
			}
		})
		return true
	}

	async update(
		id: string,
		user: UserModel,
		{ categoryId, ...data }: ProductDto
	) {
		const product = await this.prisma.product.findUnique({ where: { id } })
		if (!product) throw new NotFoundException('The product was not found')
		if (!user.isAdmin) {
			const { id: shopId } = await this.prisma.shop.findUnique({
				where: { ownerId: user.id },
				select: { id: true }
			})
			if (product.shopId !== shopId)
				throw new ForbiddenException('You have no rights')
		}

		if (product.price !== data.price) data.oldPrice = product.price

		await this.prisma.product.update({
			where: { id },
			data: {
				...data,
				category: { connect: { id: categoryId } }
			}
		})
		return true
	}

	async delete(id: string, user: UserModel) {
		const product = await this.prisma.product.findUnique({ where: { id } })
		if (!product) throw new NotFoundException('The product was not found')
		if (!user.isAdmin) {
			const { id: shopId } = await this.prisma.shop.findUnique({
				where: { ownerId: user.id },
				select: { id: true }
			})
			if (product.shopId !== shopId)
				throw new ForbiddenException('You have no rights')
		}
		await this.prisma.product.delete({ where: { id } })
		return true
	}

	async updateCountOpened(id: string) {
		await this.prisma.product.update({
			where: { id },
			data: {
				countOpened: {
					increment: 1
				}
			}
		})
		return true
	}

	async getSearchProductNames(data: GetSearchProductNamesDto) {
		return this.prisma.product.findMany({
			where: {
				name: {
					contains: data.searchSuggest,
					mode: 'insensitive'
				}
			},
			select: {
				id: true,
				name: true
			},
			orderBy: { countOpened: 'desc' },
			take: data.limit
		})
	}

	async getById(id: string) {
		const product: IProductsWithReviewsScore =
			await this.prisma.product.findUnique({
				where: { id },
				include: {
					reviews: {
						include: {
							owner: true
						}
					}
				}
			})
		if (!product) throw new NotFoundException('The product was not found')

		if (product.reviews.length) {
			product.reviewsScore = parseFloat(
				(
					product.reviews.reduce((acc, review) => acc + review.score, 0) /
					product.reviews.length
				).toFixed(1)
			)
		} else product.reviewsScore = null

		return product
	}

	async getAll({ query, limit, page = 1, categoryId, shopId }: GetProductsDto) {
		const products: IProductsWithReviewsScore[] =
			await this.prisma.product.findMany({
				where: {
					name: { contains: query, mode: 'insensitive' },
					categoryId,
					shopId
				},
				include: {
					reviews: {
						select: { score: true }
					}
				},
				skip: limit ? (page - 1) * limit : 0,
				take: limit,
				orderBy: [{ countOpened: 'desc' }, { createdAt: 'desc' }]
			})
		const totalCount = await this.prisma.product.count({
			where: {
				name: { contains: query, mode: 'insensitive' },
				categoryId
			}
		})

		products.map(product => {
			if (product.reviews.length) {
				const reviewsScore =
					product.reviews.reduce((acc, review) => acc + review.score, 0) /
					product.reviews.length
				product.reviewsScore = parseFloat(reviewsScore.toFixed(1))
			} else product.reviewsScore = null

			product.reviews = undefined
		})

		return { items: [...products], totalCount }
	}
}
