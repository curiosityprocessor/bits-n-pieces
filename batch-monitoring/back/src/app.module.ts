import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JobsModule } from "./module/jobs/jobs.module";
import { RunsModule } from "./module/runs/runs.module";
import { DatasetsModule } from "./module/datasets/datasets.module";
import { LineageModule } from "./module/lineage/lineage.module";

@Module({
  imports: [
    JobsModule,
    RunsModule,
    DatasetsModule,
    LineageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
