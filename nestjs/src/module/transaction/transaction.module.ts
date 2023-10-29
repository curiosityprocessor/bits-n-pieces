import { Module } from "@nestjs/common";
import { TransactionController } from "@src/module/transaction/transaction.controller";
import { TransactionService } from "@src/module/transaction/transaction.service";
import TransactionProviderFactory from "@src/module/transaction/provider/external/transaction.provider.factory";
import TossTransactionProvider from "@src/module/transaction/provider/external/toss.transaction.provider";
import TossPaymentApi from "@src/module/transaction/api/toss.payment.api";
import { RequestToTossTransformer } from "@src/module/transaction/transformer/request-to-toss.transformer";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionProviderFactory,
    TossTransactionProvider,
    TossPaymentApi,
    RequestToTossTransformer,
  ],
})
export class TransactionModule {}
