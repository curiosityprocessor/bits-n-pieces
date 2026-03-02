import { Module } from "@nestjs/common";
import { DatabaseModule } from "../global/database/database.module";
import { DatasetsController } from "./datasets.controller";
import { DatasetsService } from "./datasets.service";
import { datasetProviders } from "./provider/dataset.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [DatasetsController],
  providers: [DatasetsService, ...datasetProviders],
  exports: [DatasetsService],
})
export class DatasetsModule {}
