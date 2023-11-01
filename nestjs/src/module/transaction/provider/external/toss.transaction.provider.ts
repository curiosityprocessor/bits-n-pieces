import { Injectable, NotImplementedException } from "@nestjs/common";
import TossPaymentApi from "@src/module/transaction/api/toss.payment.api";
import { PostTransactionRequestDto } from "@src/module/transaction/dto/transaction";
import { RequestToTossTransformer } from "@src/module/transaction/transformer/request-to-toss.transformer";
import { TossToEntityTransformer } from "@src/module/transaction/transformer/toss-to-entity.transformer";

@Injectable()
class TossTransactionProvider {
  constructor(
    private readonly tossApi: TossPaymentApi,
    private readonly tossTransformer: RequestToTossTransformer,
    private readonly entityTransformer: TossToEntityTransformer,
  ) {}

  public async createPayment(dto: PostTransactionRequestDto) {
    const request = this.tossTransformer.toCreatePayment(dto);
    const response = await this.tossApi.createPayment(request);
    const entity = this.entityTransformer.fromCreatePayment({
      response,
      uid: dto.uid,
    });
    return entity;
  }

  public async updatePayment(request: any) {
    throw new NotImplementedException("Toss updatePayment not implemented");
  }

  public async cancelPayment(request: any) {
    throw new NotImplementedException("Toss cancelPayment not implemented");
  }
}

export default TossTransactionProvider;
