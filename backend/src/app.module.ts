import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ShopsModule } from './shops/shops.module';
import { FilesModule } from './files/files.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [AuthModule, UsersModule, CategoriesModule, ProductsModule, ShopsModule, FilesModule, ReviewsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
