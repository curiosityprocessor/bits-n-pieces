import { Module } from "@nestjs/common";
import { TransactionController } from "@src/module/transaction/transaction.controller";
import { TransactionService } from "@src/module/transaction/transaction.service";
import TransactionProviderFactory from "@src/module/transaction/provider/external/transaction.provider.factory";
import TossTransactionProvider from "@src/module/transaction/provider/external/toss.transaction.provider";
import TossPaymentApi from "@src/module/transaction/api/toss.payment.api";
import { RequestToTossTransformer } from "@src/module/transaction/transformer/request-to-toss.transformer";
import { TossToEntityTransformer } from "@src/module/transaction/transformer/toss-to-entity.transformer";
import { HttpModule } from "@nestjs/axios";
import { transactionProviders } from "@src/module/transaction/provider/repository/transaction.provider";
import { DatabaseModule } from "@src/module/global/database/database.module";

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionProviderFactory,
    TossTransactionProvider,
    TossPaymentApi,
    RequestToTossTransformer,
    TossToEntityTransformer,
    ...transactionProviders,
  ],
})
export class TransactionModule {}
