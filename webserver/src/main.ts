import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const transport = new winston.transports.File({
    filename: './logs/server.log',
    maxsize: 50 * 1024 * 1024, // 50 메가바이트
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.json(),
    ),
  });

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.STAGE === 'prod' ? 'info' : 'debug',
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.printf(({ timestamp, level, message }) => {
              const colorize = winston.format.colorize();
              return `${colorize.colorize(level, `${timestamp} ${level}:`)} ${message}`;
            }),
          ),
        }),
        transport,
      ],
    }),
  });

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      // class-transformer 적용
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Kumagotchi web-server API')
    .setDescription('API description')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, customOptions);

  const port = configService.get('PORT') || 8080;
  await app.listen(port);
  console.log(
    `kumagotchi-webserver is running on port ${port}, STAGE:${process.env.STAGE}`,
  );
}
bootstrap();
