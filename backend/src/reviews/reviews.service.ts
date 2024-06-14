import {
	BadRequestException,
	ForbiddenException,
	Injectable
} from '@nestjs/common'
import { User as UserModel } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { ReviewDto } from './dto/reviews.dto'

@Injectable()
export class ReviewsService {
	constructor(private prisma: PrismaService) {}

	async getByProduct(productId: string) {
		return this.prisma.review.findMany({
			where: { productId },
			include: {
				owner: {
					select: {
						id: true,
						name: true,
						avatar: true
					}
				}
			},
			orderBy: { createdAt: 'desc' }
		})
	}

	async getById(id: string) {
		return this.prisma.review.findUnique({ where: { id } })
	}

	async create(userId: string, { productId, ...data }: ReviewDto) {
		const alreadyHasReview = await this.prisma.review.findUnique({
			where: {
				ownerId_productId: {
					ownerId: userId,
					productId
				}
			}
		})
		if (alreadyHasReview)
			throw new BadRequestException(
				'You have already left a review about this product'
			)

		await this.prisma.review.create({
			data: {
				...data,
				owner: { connect: { id: userId } },
				product: { connect: { id: productId } }
			}
		})
		return true
	}

	async delete(id: string, user: UserModel) {
		const review = await this.prisma.review.findUnique({ where: { id } })
		if (!user.isAdmin && user.id !== review.ownerId)
			throw new ForbiddenException('You have no rights')
		await this.prisma.review.delete({ where: { id } })
		return true
	}
}
