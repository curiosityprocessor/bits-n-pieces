import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const initSwagger = (app: INestApplication): void => {
  const SWAGGER_PATH = "api";

  const config = new DocumentBuilder()
    .setTitle("Batch Monitoring API")
    .setDescription(
      "REST API for the batch monitoring service. Implements OpenLineage-compatible " +
      "event ingestion and provides endpoints for querying jobs, runs, datasets, and lineage graphs.",
    )
    .setVersion("0.0.1")
    .addTag("jobs", "Batch job registry")
    .addTag("runs", "Job run lifecycle management")
    .addTag("datasets", "Dataset registry")
    .addTag("lineage", "OpenLineage event ingestion and lineage graph queries")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PATH, app, document);
};
