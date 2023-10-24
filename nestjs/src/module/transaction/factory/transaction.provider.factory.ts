import { Injectable, NotImplementedException } from "@nestjs/common";
import PAYMENT_PROVIDER from "@src/module/transaction/interface/transaction.provider";
import TossTransactionProvider from "@src/module/transaction/factory/toss.transaction.provider";

@Injectable()
class TransactionProviderFactory {
  constructor(private readonly toss: TossTransactionProvider) {}

  public getProvider(provider: PAYMENT_PROVIDER) {
    switch (provider) {
      case PAYMENT_PROVIDER.TOSS:
        return this.toss;
      case PAYMENT_PROVIDER.FOO:
        throw new NotImplementedException(
          `provider ${provider} not implemented`,
        );
      case PAYMENT_PROVIDER.BAR:
        throw new NotImplementedException(
          `provider ${provider} not implemented`,
        );
      default:
        throw new NotImplementedException(
          `provider ${provider} not implemented`,
        );
    }
  }
}

export default TransactionProviderFactory;
