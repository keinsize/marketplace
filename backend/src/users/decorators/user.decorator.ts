import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User as UserModel } from '@prisma/client'

type TypeData = keyof UserModel

export const User = createParamDecorator(
	(data: TypeData, ctx: ExecutionContext) => {
		const { user } = ctx.switchToHttp().getRequest<{ user: UserModel }>()
		return data ? user?.[data] : user
	}
)
