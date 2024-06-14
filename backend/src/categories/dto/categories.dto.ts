import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CategoriesDto {
	@IsString({ message: 'Invalid category name' })
	name: string

	@IsString()
	@IsOptional()
	slug: string
}

export class GetCategoryProductsDto {
	@IsNumber({}, { message: 'Invalid limit value' })
	@IsOptional()
	limit?: number

	@IsNumber({}, { message: 'Invalid offset value' })
	@IsOptional()
	page?: number
}
