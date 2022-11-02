import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { productModelName, productSchema } from './schemas/product.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: productModelName,
        useFactory: () => {
          const schema = productSchema;
          return schema;
        },
      },
    ]),
    HttpModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
