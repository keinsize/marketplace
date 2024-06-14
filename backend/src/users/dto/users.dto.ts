import { PaymentSystems } from '@prisma/client'
import {
	IsEmail,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

export class UserDto {
	@IsString({ message: 'Invalid user name' })
	name: string

	@IsEmail({}, { message: 'Invalid email' })
	email: string

	@IsString({ message: 'Invalid password' })
	@IsOptional()
	password?: string

	@IsString({ message: 'Invalid address' })
	@IsOptional()
	address?: string

	@IsString({ message: 'Invalid avatar' })
	@IsOptional()
	avatar?: string
}

export class CreditCardDto {
	@IsNumber({}, { message: 'Invalid number' })
	@MinLength(1)
	@MaxLength(16)
	number: number

	@IsString({ message: 'Invalid expiry date' })
	expiryDate: string

	@IsNumber({}, { message: 'Invalid code' })
	@MinLength(1)
	@MaxLength(3)
	code: number

	paymentSystem: PaymentSystems
}
