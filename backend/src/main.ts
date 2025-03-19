/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
  console.log('Backend rodando na porta 3001');
}
bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
});
