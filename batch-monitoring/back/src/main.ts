import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { LoggingInterceptor } from "./module/global/interceptor/logging.interceptor";
import { initSwagger } from "./config/swagger/swagger";
import { getEnvOrDefault } from "./util/env.util";
import logger from "./module/global/logger/winston.logger";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: false });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.enableCors();

  initSwagger(app);

  const port = Number(getEnvOrDefault("APP_PORT", "3000"));
  await app.listen(port);

  logger.info(`Batch Monitoring API running on http://localhost:${port}`);
  logger.info(`Swagger UI: http://localhost:${port}/api`);
}

bootstrap().catch((err) => {
  console.error("Failed to start application", err);
  process.exit(1);
});
