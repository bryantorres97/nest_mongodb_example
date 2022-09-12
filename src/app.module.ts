import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CERT_NAME,
  MONGODB_URI,
  MONGO_SSL_CONFIG,
} from './config/constants.config';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

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
      useFactory: async (configService: ConfigService) => {
        if (configService.get<boolean>(MONGO_SSL_CONFIG)) {
          const sslFile = `${__dirname}/../certs/${configService.get<string>(
            CERT_NAME,
          )}`;
          return {
            uri: configService.get<string>(MONGODB_URI),
            ssl: true,
            sslValidate: true,
            sslKey: sslFile,
            sslCert: sslFile,
            authMechanism: 'MONGODB-X509',
            retryWrites: true,
            w: 'majority',
            authSource: '$external',
          };
        }

        return {
          uri: configService.get<string>(MONGODB_URI),
        };
      },
      inject: [ConfigService],
    }),

    ProductsModule,

    UsersModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
