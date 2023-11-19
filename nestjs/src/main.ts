import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { initSwagger } from "./swagger/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // transformOptions: { enableImplicitConversion: true }, // activate for global emplicit transformation
    }),
  );
  initSwagger(app);
  await app.listen(3000);
}
bootstrap();
