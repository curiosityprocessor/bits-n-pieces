import { Injectable } from "@nestjs/common";
import { PostTransactionRequestDto } from "@src/module/transaction/dto/transaction";
import TransactionProviderFactory from "@src/module/transaction/provider/external/transaction.provider.factory";

@Injectable()
export class TransactionService {
  constructor(private transactionProviderFactory: TransactionProviderFactory) {}
  public ping() {
    return "pong";
  }

  public async createTransaction(
    dto: PostTransactionRequestDto,
  ): Promise<void> {
    const { provider } = dto;
    const transactionProvider =
      this.transactionProviderFactory.getProvider(provider);
    const result = transactionProvider.createPayment(dto);
    // TODO: transform to Entity
    // TODO: implement ORM
  }
}
