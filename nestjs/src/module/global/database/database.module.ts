import { Module } from "@nestjs/common";
import { databaseProviders } from "@src/module/global/database/database.provider";

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
