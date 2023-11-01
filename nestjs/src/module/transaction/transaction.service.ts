import { Inject, Injectable } from "@nestjs/common";
import { PostTransactionRequestDto } from "@src/module/transaction/dto/transaction";
import TransactionProviderFactory from "@src/module/transaction/provider/external/transaction.provider.factory";
import { Repository } from "typeorm";
import { Transaction } from "@src/module/transaction/entity/transaction.entity";
import { TRANSACTION_REPOSITORY } from "@src/module/global/database/constants";

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private transactionRepository: Repository<Transaction>,
    private transactionProviderFactory: TransactionProviderFactory,
  ) {}
  public ping() {
    return "pong";
  }

  public async createTransaction(
    dto: PostTransactionRequestDto,
  ): Promise<void> {
    const { provider } = dto;
    const transactionProvider =
      this.transactionProviderFactory.getProvider(provider);
    const entity = await transactionProvider.createPayment(dto);
    await this.transactionRepository.save(entity);
  }
}
