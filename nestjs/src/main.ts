import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { initSwagger } from "./config/swagger/swagger";
import { LoggingInterceptor } from "./module/global/interceptor/logging.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // transformOptions: { enableImplicitConversion: true }, // activate for global emplicit transformation
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  initSwagger(app);
  await app.listen(3000);
}
bootstrap();
