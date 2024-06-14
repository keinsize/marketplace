import { UseGuards, applyDecorators } from '@nestjs/common'
import { AdminGuard } from '../guards/admin.guard'
import { JwtAuthGuard } from '../guards/jwt.guard'

export function Auth(role: Roles = Roles.User) {
	return applyDecorators(
		role === Roles.Admin
			? UseGuards(JwtAuthGuard, AdminGuard)
			: UseGuards(JwtAuthGuard)
	)
}

export enum Roles {
	Admin,
	User
}
