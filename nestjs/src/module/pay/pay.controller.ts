import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from "@nestjs/common";
import { PayService } from "@src/module/pay/pay.service";

@Controller("pay")
export class PayController {
  constructor(private readonly payService: PayService) {}

  @HttpCode(HttpStatus.OK)
  @Get("ping")
  ping(): string {
    return this.payService.ping();
  }

  @HttpCode(HttpStatus.OK)
  @Get("orders")
  orders(): any[] {
    return [];
  }

  @HttpCode(HttpStatus.OK)
  @Get("transactions")
  payments(): any[] {
    return [];
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("transactions")
  createTransaction(): void {
    return;
  }

  @HttpCode(HttpStatus.OK)
  @Put("transactions/:transactionId")
  updateTransaction(): void {
    return;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("transactions/:transactionId/cancel")
  cancelTransaction(): void {
    return;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("transactions/callback")
  transactionCallback(): void {
    return;
  }
}
