import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PayModule } from "./module/pay/pay.module";

@Module({
  imports: [PayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
