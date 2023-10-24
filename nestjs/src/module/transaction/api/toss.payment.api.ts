import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import {
  TossPaymentResponse,
  TossPostPaymentRequest,
} from "@src/module/transaction/dto/toss.payment";
import { getEnv } from "@src/util/env.util";
import { isAxiosError } from "axios";

const BASE_URL = "https://api.tosspayments.com";
const ENDPOINT = {
  CREATE_TRANSACTION: "/v1/payments/confirm",
} as const;

@Injectable()
class TossPaymentApi {
  constructor(private readonly httpService: HttpService) {}

  private getHeader() {
    const TOSS_PAYMENTS_SECRET_KEY = Buffer.from(
      `${getEnv("TOSS_PAYMENTS_SECRET_KEY")}:`,
    ).toString("base64");

    return {
      Authorization: `Basic ${TOSS_PAYMENTS_SECRET_KEY}`,
      "Content-Type": "application/json",
    };
  }

  public async createPayment(request: TossPostPaymentRequest) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<TossPaymentResponse>(
          `${BASE_URL}${ENDPOINT.CREATE_TRANSACTION}`,
          request,
          { headers: this.getHeader() },
        ),
      );
      return data as TossPaymentResponse;
    } catch (error) {
      const errorMessage = isAxiosError(error)
        ? JSON.stringify({
            status: error.response.status,
            ...error.response.data,
          })
        : error.message;
      console.error(`failed to createTransaction. ${errorMessage}`);
      throw error;
    }
  }
}

export default TossPaymentApi;
