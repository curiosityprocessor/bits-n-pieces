import { Injectable, NotImplementedException } from "@nestjs/common";
import { PostTransactionRequestDto } from "@src/module/transaction/dto/transaction";
import { TossPostPaymentRequest } from "@src/module/transaction/dto/toss.payment";

@Injectable()
export class RequestToTossTransformer {
  public toCreatePayment(
    dto: PostTransactionRequestDto,
  ): TossPostPaymentRequest {
    const { transactionId, amount, paymentKey } = dto;
    return {
      orderId: transactionId,
      paymentKey,
      amount,
    };
  }

  public toUpdatePayment(dto: any): any {
    throw new NotImplementedException(
      "TossTransformer toUpdatePayment not implemented",
    );
  }

  public toDeletePayment(dto: any): any {
    throw new NotImplementedException(
      "TossTransformer toDeletePayment not implemented",
    );
  }
}
