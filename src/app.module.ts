import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CERT_NAME, MONGODB_URI } from './config/constants.config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // .env.development
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
      }),
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(MONGODB_URI),
        ssl: true,
        sslValidate: true,
        sslKey: `${__dirname}/../certs/${configService.get<string>(CERT_NAME)}`,
        sslCert: `${__dirname}/../certs/${configService.get<string>(
          CERT_NAME,
        )}`,
        authMechanism: 'MONGODB-X509',
        retryWrites: true,
        w: 'majority',
        authSource: '$external',
      }),
      inject: [ConfigService],
    }),

    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
