import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './classes/';
import { CreateProductDto, GetProductDto, UpdateProductDto } from './dtos';
import { productModelName } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(productModelName)
    private readonly productModel: Model<Product>,
  ) {}

  async getProducts() {
    return await this.productModel.find({ isActive: true });
  }

  async getProduct(product: GetProductDto) {
    return await this.productModel.find({ ...product, isActive: true });
  }

  async createProduct(product: CreateProductDto) {
    return await this.productModel.create(product);
  }

  async updateProduct(_id: string, product: UpdateProductDto) {
    return await this.productModel.findOneAndUpdate(
      { _id, isActive: true },
      product,
      { new: true },
    );
  }

  async deleteProduct(_id: string) {
    return await this.productModel.findOneAndUpdate(
      { _id, isActive: true },
      { isActive: false },
      { new: true },
    );
  }
}
