import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      strictGroups: true,
      transform: true,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );
  await app.listen(3001);
}
bootstrap();
