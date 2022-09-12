import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { getError } from '../common/helpers';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dtos/';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  logger = new Logger('ProductsController');
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(@Res() res: Response) {
    try {
      this.logger.log('Getting all products');
      const products = await this.productsService.getProducts();
      return res.json(products);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get(':id')
  async getProduct(@Res() res: Response, @Param('id') _id: string) {
    try {
      this.logger.log(`Getting product with id: ${_id}`);
      const product = await this.productsService.getProduct({ _id });
      if (!product)
        throw new NotFoundException('No se ha encontrado el producto');
      return res.json(product);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Post()
  async createProduct(@Res() res: Response, @Body() product: CreateProductDto) {
    try {
      this.logger.log(`Creating product: ${JSON.stringify(product, null, 2)}`);
      const newProduct = await this.productsService.createProduct(product);
      if (!newProduct)
        throw new BadRequestException('No se ha podido crear el producto');
      return res.json(newProduct);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Put(':id')
  async updateProduct(
    @Res() res: Response,
    @Param('id') _id: string,
    @Body() product: UpdateProductDto,
  ) {
    try {
      this.logger.log(
        `Updating product with id: ${_id} and data: ${JSON.stringify(
          product,
          null,
          2,
        )}`,
      );
      const updatedProduct = await this.productsService.updateProduct(
        _id,
        product,
      );
      if (!updatedProduct)
        throw new NotFoundException('No se ha podido actualizar el producto');
      return res.json(updatedProduct);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Delete(':id')
  async deleteProduct(@Res() res: Response, @Param('id') _id: string) {
    try {
      this.logger.log(`Deleting product with id: ${_id}`);
      const deletedProduct = await this.productsService.deleteProduct(_id);
      if (!deletedProduct)
        throw new NotFoundException('No se ha podido eliminar el producto');
      return res.json(deletedProduct);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }
}
