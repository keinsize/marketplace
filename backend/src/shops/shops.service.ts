import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { User as UserModel } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { ProductsService } from 'src/products/products.service'
import generateSlug from 'src/utils/generateSlug'
import { GetProductsDto, ShopDto } from './dto/shops.dto'

@Injectable()
export class ShopsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly productsService: ProductsService
	) {}

	async createOrUpdate(userId: string, data: ShopDto) {
		data.slug = generateSlug(data.name)
		const isShopExists = await this.prisma.shop.findUnique({
			where: { slug: data.slug }
		})

		if (isShopExists)
			throw new BadRequestException('A shop with that name already exists')
		await this.prisma.shop.upsert({
			where: {
				ownerId: userId
			},
			create: {
				...data,
				owner: { connect: { id: userId } }
			},
			update: {
				...data
			}
		})
		return { slug: data.slug }
	}

	async delete(id: string, user: UserModel) {
		const shop = await this.prisma.shop.findUnique({ where: { id } })
		if (!user.isAdmin && user.id !== shop.ownerId)
			throw new ForbiddenException('You have no rights')
		await this.prisma.shop.delete({ where: { id } })
		return true
	}

	async getAll(searchTerm?: string) {
		return this.prisma.shop.findMany({
			where: { name: { contains: searchTerm, mode: 'insensitive' } }
		})
	}

	async getBySlug(slug: string) {
		const shop = await this.prisma.shop.findUnique({ where: { slug } })
		if (!shop) throw new NotFoundException('The shop was not found')
		return shop
	}

	async getBySlugWithProducts(
		slug: string,
		{ limit, page = 1 }: GetProductsDto
	) {
		const shop = await this.prisma.shop.findUnique({
			where: { slug }
		})
		if (!shop) throw new NotFoundException('The shop was not found')
		const products = await this.productsService.getAll({
			shopId: shop.id,
			page,
			limit
		})

		return { ...shop, products }
	}

	async getById(id: string) {
		return this.prisma.shop.findUnique({ where: { id } })
	}
}
