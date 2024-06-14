import { IsNumber, IsOptional, IsString } from 'class-validator'

export class ShopDto {
	@IsString({ message: 'Invalid shop name' })
	name: string

	slug: string
}

export class GetProductsDto {
	@IsNumber({}, { message: 'Invalid limit value' })
	@IsOptional()
	limit?: number

	@IsNumber({}, { message: 'Invalid offset value' })
	@IsOptional()
	page?: number
}
