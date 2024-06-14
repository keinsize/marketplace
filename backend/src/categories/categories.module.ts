import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProductsService } from 'src/products/products.service'
import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'

@Module({
	controllers: [CategoriesController],
	providers: [CategoriesService, PrismaService, ProductsService]
})
export class CategoriesModule {}
