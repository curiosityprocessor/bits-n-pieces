import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from "@nestjs/common";
import { TransactionService } from "@src/module/pay/transaction.service";

@Controller("transactions")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @HttpCode(HttpStatus.OK)
  @Get("ping")
  ping(): string {
    return this.transactionService.ping();
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  payments(): any[] {
    return [];
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createTransaction(): void {
    return;
  }

  @HttpCode(HttpStatus.OK)
  @Put(":transactionId")
  updateTransaction(): void {
    return;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(":transactionId/cancel")
  cancelTransaction(): void {
    return;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("callback")
  transactionCallback(): void {
    return;
  }
}
