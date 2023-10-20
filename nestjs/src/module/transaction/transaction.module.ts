import { Module } from "@nestjs/common";
import { TransactionController } from "@src/module/transaction/transaction.controller";
import { TransactionService } from "@src/module/transaction/transaction.service";

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
