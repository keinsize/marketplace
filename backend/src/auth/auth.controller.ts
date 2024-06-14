import {
	Body,
	Controller,
	Post,
	Req,
	Res,
	UnauthorizedException
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(
		@Body() data: AuthDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { refreshToken, ...response } = await this.authService.login(data)
		this.authService.addRefreshTokenToResponse(res, refreshToken)
		return response
	}

	@Post('register')
	async register(
		@Body() data: AuthDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { refreshToken, ...response } = await this.authService.register(data)
		this.authService.addRefreshTokenToResponse(res, refreshToken)
		return response
	}

	@Post('logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		this.authService.removeRefreshTokenFromResponse(res)
		return true
	}

	@Post('login/access-token')
	async getNewTokens(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const refreshTokenFromCookies = req.cookies['refreshToken']
		if (!refreshTokenFromCookies) throw new UnauthorizedException()
		const { refreshToken, ...response } = await this.authService.getNewTokens(
			refreshTokenFromCookies
		)
		this.authService.addRefreshTokenToResponse(res, refreshToken)

		return response
	}
}
