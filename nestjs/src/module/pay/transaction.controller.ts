import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from "@nestjs/common";
import { TransactionService } from "@src/module/pay/transaction.service";
import { PostTransactionRequestDto } from "@src/module/pay/dto/transaction";

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
  createTransaction(@Body() dto: PostTransactionRequestDto): void {
    console.log(
      `POST: [/pay/transactions]
        dto: ${JSON.stringify(dto)}
        ${Number.isFinite(dto.amount)}`,
    );
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
