import { Injectable } from "@nestjs/common";
import { TossPaymentResponse } from "@src/module/transaction/dto/toss.payment";
import { Transaction } from "@src/module/transaction/entity/transaction.entity";

@Injectable()
export class TossToEntityTransformer {
  public fromCreatePayment(args: {
    response: TossPaymentResponse;
    uid: string;
  }): Transaction {
    const { response, uid } = args;
    const { orderId, totalAmount, orderName, status } = response;
    return {
      id: orderId,
      amount: totalAmount,
      description: orderName,
      status,
      uid,
    };
  }
}
