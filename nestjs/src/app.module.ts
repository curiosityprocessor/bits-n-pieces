import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TransactionModule } from "./module/transaction/transaction.module";
import { DatabaseModule } from "./module/global/database/database.module";
import { ItemModule } from "./module/item/item.module";
import { UserModule } from "./module/user/user.module";

@Module({
  imports: [TransactionModule, DatabaseModule, ItemModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
