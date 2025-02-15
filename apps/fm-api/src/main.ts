import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NotFoundExceptionFilter } from './filters/not-found-exception.filter'
import { AppModule } from './app.module'
import { PrismaExceptionFilter } from './filters/prisma-exception.filter'
import { AllExceptionsFilter } from './filters/all-exceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new NotFoundExceptionFilter(),
    new AllExceptionsFilter(),
  )

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
