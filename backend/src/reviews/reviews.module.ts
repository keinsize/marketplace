import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ReviewsController } from './reviews.controller'
import { ReviewsService } from './reviews.service'

@Module({
	controllers: [ReviewsController],
	providers: [ReviewsService, PrismaService]
})
export class ReviewsModule {}
