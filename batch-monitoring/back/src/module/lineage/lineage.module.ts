import { Module } from "@nestjs/common";
import { DatabaseModule } from "../global/database/database.module";
import { LineageController } from "./lineage.controller";
import { LineageService } from "./lineage.service";

@Module({
  imports: [DatabaseModule],
  controllers: [LineageController],
  providers: [LineageService],
})
export class LineageModule {}
