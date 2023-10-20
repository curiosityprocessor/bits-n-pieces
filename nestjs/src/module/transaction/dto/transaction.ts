import { Transform } from "class-transformer";
import { IsString, IsNumber, IsIn } from "class-validator";

export class PostTransactionRequestDto {
  @IsString()
  uid: string;

  @IsString()
  transactionId: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  amount: number;

  @IsIn(["TOSS"])
  provider: PaymentProvider;
}

type PaymentProvider = "TOSS";
