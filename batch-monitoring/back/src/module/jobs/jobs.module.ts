import { Module } from "@nestjs/common";
import { DatabaseModule } from "../global/database/database.module";
import { JobsController } from "./jobs.controller";
import { JobsService } from "./jobs.service";
import { jobProviders } from "./provider/job.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [JobsController],
  providers: [JobsService, ...jobProviders],
  exports: [JobsService],
})
export class JobsModule {}
