import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from "@nestjs/common";
import { TransactionService } from "@src/module/transaction/transaction.service";
import { PostTransactionRequestDto } from "@src/module/transaction/dto/transaction";
import { ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";

@ApiTags("transactions")
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

  //testing swagger exclude api
  @ApiExcludeEndpoint()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createTransaction(@Body() dto: PostTransactionRequestDto): Promise<void> {
    console.log(
      `POST: [/pay/transactions]
        dto: ${JSON.stringify(dto)}`,
    );
    return this.transactionService.createTransaction(dto);
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
