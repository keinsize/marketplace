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
import { Auth, Roles } from 'src/auth/decorators/auth.decorator'
import { User } from './decorators/user.decorator'
import { CreditCardDto, UserDto } from './dto/users.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Put('profile')
	@Auth()
	async updateProfile(@User('id') id: string, @Body() data: UserDto) {
		this.usersService.update(id, data)
	}

	// @Post('balance/:id')
	// @Auth(Roles.Admin)
	// addMoneyToBalance(@Param('id') id: string, @Body('count') count: number) {
	// 	return this.usersService.addMoneyToBalance(id, count)
	// }

	// @Delete('balance/:id')
	// @Auth(Roles.Admin)
	// removeMoneyFromBalance(
	// 	@Param('id') id: string,
	// 	@Body('count') count: number
	// ) {
	// 	return this.usersService.removeMoneyFromBalance(id, count)
	// }

	@Get('cart')
	@Auth()
	async getCart(@User('id') id: string) {
		return this.usersService.getProductsFromCart(id)
	}

	@Post('cart')
	@Auth()
	async addProductToCart(
		@User('id') id: string,
		@Body('productId') productId: string
	) {
		return this.usersService.addProductToCart(id, productId)
	}

	@Delete('cart/:id')
	@Auth()
	async deleteProductFromCart(
		@User('id') id: string,
		@Param('id') productId: string
	) {
		return this.usersService.removeProductFromCart(id, productId)
	}

	@Get('favorites')
	@Auth()
	async getFavorites(@User('id') id: string) {
		return this.usersService.getFavoriteProducts(id)
	}

	@Put('favorites')
	@Auth()
	async toggleFavoriteProduct(
		@User('id') id: string,
		@Body('productId') productId: string
	) {
		return this.usersService.toggleFavoriteProduct(id, productId)
	}

	// @Get('purchases')
	// @Auth()
	// async getPurchases(@User('id') id: string) {
	// 	return this.usersService.getPurchases(id)
	// }

	@Post('admin/:id')
	@Auth(Roles.Admin)
	makeAdmin(@Param('id') id: string) {
		return this.usersService.makeAdmin(id)
	}

	@Delete('admin/:id')
	@Auth(Roles.Admin)
	removeAdmin(@Param('id') id: string) {
		return this.usersService.removeAdmin(id)
	}

	@Get('cards')
	@Auth()
	async getCards(@User('id') id: string) {
		return this.usersService.getCards(id)
	}

	@Post('cards')
	@Auth()
	async addCard(@User('id') id: string, @Body() data: CreditCardDto) {
		return this.usersService.addCard(id, data)
	}

	@Delete('cards/:id')
	@Auth()
	async removeCard(@User('id') id: string, @Param('id') cardId: string) {
		return this.usersService.removeCard(id, cardId)
	}

	@Get()
	@Auth(Roles.Admin)
	async getAll(@Query('email') email?: string) {
		return this.usersService.getAll(email)
	}

	@Get('profile')
	@Auth()
	async getProfile(@User('id') id: string) {
		return this.usersService.getById(id)
	}

	@Get(':id')
	@Auth(Roles.Admin)
	async getUser(@Param('id') id: string) {
		return this.usersService.getById(id)
	}

	@Put(':id')
	@Auth()
	async update(@Param('id') id: string, @Body() data: UserDto) {
		this.usersService.update(id, data)
	}

	@Delete(':id')
	@Auth(Roles.Admin)
	async delete(@Param('id') id: string) {
		return this.usersService.delete(id)
	}
}
