import { Module } from "@nestjs/common";
import { DatabaseModule } from "../global/database/database.module";
import { RunsController } from "./runs.controller";
import { RunsService } from "./runs.service";
import { runProviders } from "./provider/run.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [RunsController],
  providers: [RunsService, ...runProviders],
  exports: [RunsService],
})
export class RunsModule {}
