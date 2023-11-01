import {
  DATA_SOURCE,
  TRANSACTION_REPOSITORY,
} from "@src/module/global/database/constants";
import { DataSource } from "typeorm";
import { Transaction } from "@src/module/transaction/entity/transaction.entity";

export const transactionProviders = [
  {
    provide: TRANSACTION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Transaction),
    inject: [DATA_SOURCE],
  },
];
