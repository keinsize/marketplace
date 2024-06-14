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
import { ReviewDto } from './dto/reviews.dto'
import { ReviewsService } from './reviews.service'

@Controller('reviews')
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@Get()
	async getByProduct(@Query('product') productId: string) {
		return this.reviewsService.getByProduct(productId)
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.reviewsService.getById(id)
	}

	@Post()
	@Auth()
	async create(@User('id') userId: string, @Body() data: ReviewDto) {
		return this.reviewsService.create(userId, data)
	}

	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string, @User() user: UserModel) {
		return this.reviewsService.delete(id, user)
	}
}
