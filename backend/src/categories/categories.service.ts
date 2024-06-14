import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProductsService } from 'src/products/products.service'
import generateSlug from 'src/utils/generateSlug'
import { CategoriesDto, GetCategoryProductsDto } from './dto/categories.dto'

@Injectable()
export class CategoriesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly productsService: ProductsService
	) {}

	async getAll(searchTerm?: string) {
		return this.prisma.category.findMany({
			where: { name: { contains: searchTerm, mode: 'insensitive' } }
		})
	}

	async getBySlugWithProducts(
		slug: string,
		{ limit, page = 1 }: GetCategoryProductsDto
	) {
		const category = await this.prisma.category.findUnique({
			where: { slug }
		})
		if (!category) throw new NotFoundException('The category was not found')
		const products = await this.productsService.getAll({
			categoryId: category.id,
			page,
			limit
		})

		return { ...category, products }
	}

	async getBySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: { slug }
		})
		if (!category) throw new NotFoundException('The category was not found')
		return category
	}

	async create(data: CategoriesDto) {
		data.slug = generateSlug(data.name)
		await this.prisma.category.create({ data })
		return true
	}

	async delete(id: string) {
		await this.prisma.category.delete({ where: { id } })
		return true
	}
}
