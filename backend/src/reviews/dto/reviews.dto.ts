import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator'

export class ReviewDto {
	@IsNumber({}, { message: 'Invalid score' })
	@Min(1)
	@Max(5)
	score: number

	@IsString({ message: 'Invalid review' })
	@IsOptional()
	comment: string

	@IsString()
	productId: string
}
