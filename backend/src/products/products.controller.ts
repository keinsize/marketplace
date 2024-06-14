import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query
} from '@nestjs/common'
import { User as UserModel } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from 'src/users/decorators/user.decorator'
import {
	GetProductsDto,
	GetSearchProductNamesDto,
	ProductDto
} from './dto/products.dto'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@Auth()
	async create(@User('id') userId: string, @Body() data: ProductDto) {
		return this.productsService.create(userId, data)
	}

	@Put(':id')
	@Auth()
	async update(
		@Param('id') id: string,
		@User() user: UserModel,
		@Body() data: ProductDto
	) {
		return this.productsService.update(id, user, data)
	}

	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string, @User() user: UserModel) {
		return this.productsService.delete(id, user)
	}

	@Post('/update-count-opened')
	async updateCountOpened(@Body('id') id: string) {
		return this.productsService.updateCountOpened(id)
	}

	@Get('search')
	async getProductNames(@Query() query: GetSearchProductNamesDto) {
		return this.productsService.getSearchProductNames(query)
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		return this.productsService.getById(id)
	}

	@Get()
	async getProducts(@Query() query: GetProductsDto) {
		return this.productsService.getAll(query)
	}
}
