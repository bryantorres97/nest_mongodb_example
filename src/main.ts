import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { SERVER_PORT } from './config/constants.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true, // Elimina los datos que no estan en el DTO (no recomendado)
      // forbidNonWhitelisted: true, // Lanza un error si se envian datos que no estan en el DTO (no recomendado)
    }),
  );
  app.enableCors();
  const logger = new Logger('Bootstrap');
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3005;
  initSwagger(app);
  await app.listen(port);
  logger.log(`Server is running at ${await app.getUrl()}`);
}
bootstrap();
