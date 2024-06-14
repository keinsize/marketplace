import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query
} from '@nestjs/common'
import { User as UserModel } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from 'src/users/decorators/user.decorator'
import { GetProductsDto, ShopDto } from './dto/shops.dto'
import { ShopsService } from './shops.service'

@Controller('shops')
export class ShopsController {
	constructor(private readonly shopsService: ShopsService) {}

	@Post()
	@Auth()
	async createOrUpdate(@User('id') userId: string, @Body() data: ShopDto) {
		return this.shopsService.createOrUpdate(userId, data)
	}

	@Delete(':id')
	@Auth()
	async delete(@User() user: UserModel, @Param('id') id: string) {
		return this.shopsService.delete(id, user)
	}

	@Get('/slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.shopsService.getBySlug(slug)
	}

	@Get('/withProducts/:slug')
	async getBySlugWithProducts(
		@Param('slug') slug: string,
		@Query() params: GetProductsDto
	) {
		return this.shopsService.getBySlugWithProducts(slug, params)
	}

	@Get('/:id')
	async getById(@Param('id') id: string) {
		return this.shopsService.getById(id)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.shopsService.getAll(searchTerm)
	}
}
