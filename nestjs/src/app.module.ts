import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TransactionModule } from "./module/transaction/transaction.module";
import { DatabaseModule } from "./module/global/database/database.module";

@Module({
  imports: [TransactionModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
