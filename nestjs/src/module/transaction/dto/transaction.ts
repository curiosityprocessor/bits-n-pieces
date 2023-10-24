import { Transform } from "class-transformer";
import { IsString, IsNumber, IsIn } from "class-validator";
import PAYMENT_PROVIDER from "@src/module/transaction/interface/transaction.provider";

export class PostTransactionRequestDto {
  @IsString()
  uid: string;

  @IsString()
  paymentKey: string;

  @IsString()
  transactionId: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  amount: number;

  @IsIn(Object.values(PAYMENT_PROVIDER))
  provider: PAYMENT_PROVIDER;
}
