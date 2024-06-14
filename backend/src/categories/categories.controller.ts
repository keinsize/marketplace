import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query
} from '@nestjs/common'
import { Auth, Roles } from 'src/auth/decorators/auth.decorator'
import { CategoriesService } from './categories.service'
import { CategoriesDto, GetCategoryProductsDto } from './dto/categories.dto'

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.categoriesService.getAll(searchTerm)
	}

	@Get('/withProducts/:slug')
	async getBySlugWithProducts(
		@Param('slug') slug: string,
		@Query() params: GetCategoryProductsDto
	) {
		return this.categoriesService.getBySlugWithProducts(slug, params)
	}

	@Get('/:slug')
	async getBySlug(
		@Param('slug') slug: string,
		@Query() params: GetCategoryProductsDto
	) {
		return this.categoriesService.getBySlug(slug)
	}

	@Post()
	@Auth(Roles.Admin)
	async create(@Body() data: CategoriesDto) {
		return this.categoriesService.create(data)
	}

	@Delete(':id')
	@Auth(Roles.Admin)
	async delete(@Param('id') id: string) {
		return this.categoriesService.delete(id)
	}
}
