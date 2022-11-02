import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './classes/';
import { CreateProductDto, GetProductDto, UpdateProductDto } from './dtos';
import { productModelName } from './schemas/product.schema';
import { HttpService } from '@nestjs/axios';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');
@Injectable()
export class ProductsService {
  instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
  });
  constructor(
    @InjectModel(productModelName)
    private readonly productModel: Model<Product>,
    private readonly httpService: HttpService,
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

  async getPosts() {
    try {
      const response = await this.httpService.axiosRef.get(
        'https://jsonplaceholder.typicode.com/posts',
      );

      // this.productModel.create(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'No se ha podido realizar la petición',
      );
    }
  }

  async postPosts(body: any, token: string) {
    try {
      const { data } = await this.instance.post('posts', body, {
        headers: {
          authorization: 'Bearer ' + token,
          // Content_Type: 'application/json',
        },

        // posts/1?name=foo&userId=1
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'No se ha podido realizar la petición',
      );
    }
  }
}
