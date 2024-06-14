import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProductsService } from 'src/products/products.service'
import { ShopsController } from './shops.controller'
import { ShopsService } from './shops.service'

@Module({
	controllers: [ShopsController],
	providers: [ShopsService, PrismaService, ProductsService]
})
export class ShopsModule {}
