import { Injectable, NotImplementedException } from "@nestjs/common";
import TossPaymentApi from "@src/module/transaction/api/toss.payment.api";
import { PostTransactionRequestDto } from "@src/module/transaction/dto/transaction";
import { RequestToTossTransformer } from "@src/module/transaction/transformer/request-to-toss.transformer";

@Injectable()
class TossTransactionProvider {
  constructor(
    private readonly tossApi: TossPaymentApi,
    private readonly transformer: RequestToTossTransformer,
  ) {}

  public async createPayment(dto: PostTransactionRequestDto) {
    const request = this.transformer.toCreatePayment(dto);
    const response = await this.tossApi.createPayment(request);
    // TODO: custom validator, post-processor
    return response;
  }

  public async updatePayment(request: any) {
    throw new NotImplementedException("Toss updatePayment not implemented");
  }

  public async cancelPayment(request: any) {
    throw new NotImplementedException("Toss cancelPayment not implemented");
  }
}

export default TossTransactionProvider;
