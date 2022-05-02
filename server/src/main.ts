import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from '@nestjs/config';
import {ValidationPipe} from '@nestjs/common';
import {PrismaClientExceptionFilter, PrismaService} from 'nestjs-prisma';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import type {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from 'src/common/configs/config.interface';

let test;

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    let prisma: PrismaService = app.get(PrismaService);
    let candidate = await prisma.user.findMany();

    if (candidate.length === 0) {
      await prisma.user.create({
        data: {
          role: 'ADMIN',
          email: 'rapman477@ya.ru',
          name: 'Ray',
        },
      });
    }

    // Validation ?????????????
    app.useGlobalPipes(new ValidationPipe());

    // enable shutdown hook ?????????????
    const prismaService: PrismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    // Prisma Client Exception Filter for unhandled exceptions  ??????????????
    const {httpAdapter} = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

    const configService = app.get(ConfigService);
    const corsConfig = configService.get<CorsConfig>('cors');
    const swaggerConfig = configService.get<SwaggerConfig>('swagger');

    // Swagger Api
    if (swaggerConfig.enabled) {
      const options = new DocumentBuilder()
        .setTitle(swaggerConfig.title || 'Nestjs')
        .setDescription(
          swaggerConfig.description || 'The nestjs API description',
        )
        .setVersion(swaggerConfig.version || '1.0')
        .build();
      const document = SwaggerModule.createDocument(app, options);

      SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
    }

    // Cors
    if (corsConfig.enabled) {
      app.enableCors();
    }

    await app.listen(PORT, () =>
      console.log(`Server is started on port: ${PORT}`),
    );


  } catch (e) {
    console.log(e);
  }

  return test;
  // console.log(test)
};
start();

// const launch = async () => {
//   let test = await start();
//   console.log('end')
//   console.log(test);
// }
//
// launch();
