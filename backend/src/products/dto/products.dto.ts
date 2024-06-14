import { Product } from '@prisma/client'
import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class ProductDto {
	@IsString({ message: 'Invalid product name' })
	name: string

	@IsString({ message: 'Invalid description' })
	description: string

	@IsArray()
	@IsString({ each: true })
	images: string[]

	@IsNumber({}, { message: 'Incorrect price' })
	@Min(0, { message: 'The price cannot be negative' })
	price: number

	@IsNumber({}, { message: 'Invalid price' })
	@Min(0, { message: 'The price cannot be negative' })
	@IsOptional()
	oldPrice: number

	@IsString({ message: 'Invalid category' })
	categoryId: string
}

export class GetSearchProductNamesDto {
	@IsString({ message: 'Invalid search suggestion' })
	@IsOptional()
	searchSuggest: string

	@IsNumber({}, { message: 'Invalid limit value' })
	@IsOptional()
	limit?: number
}

export class GetProductsDto {
	@IsString({ message: 'Invalid search term' })
	@IsOptional()
	query?: string

	@IsNumber({}, { message: 'Invalid limit value' })
	@IsOptional()
	limit?: number

	@IsNumber({}, { message: 'Invalid offset value' })
	@IsOptional()
	page?: number

	categoryId?: string
	shopId?: string
}

export interface IProductsWithReviewsScore extends Product {
	reviews: { score: number }[]
	reviewsScore?: number
}
