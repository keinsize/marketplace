import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { verify } from 'argon2'
import { Response } from 'express'
import { UsersService } from 'src/users/users.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwt: JwtService
	) {}

	async login(data: AuthDto) {
		const { password, ...user } = await this.validateUser(data)
		const tokens = this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	async register(data: AuthDto) {
		const { password, ...user } = await this.usersService.create(data)
		const tokens = this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException()

		return this.issueTokens(result.id)
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + 7)

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			domain: 'localhost',
			expires: expiresIn,
			secure: true,
			sameSite: 'strict'
		})
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie('refreshToken', '', {
			httpOnly: true,
			domain: 'localhost',
			expires: new Date(0),
			secure: true,
			sameSite: 'strict'
		})
	}

	private async validateUser(data: AuthDto) {
		const user = await this.usersService.getByEmail(data.email)
		if (!user)
			throw new UnauthorizedException(
				'The email address or password is incorrect'
			)

		const isValid = await verify(user.password, data.password)
		if (!isValid)
			throw new UnauthorizedException(
				'The email address or password is incorrect'
			)

		return user
	}

	private issueTokens(userId: string) {
		const data = { id: userId }
		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})
		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})
		return { accessToken, refreshToken }
	}
}
