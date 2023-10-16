import { Controller, Get } from "@nestjs/common";
import { PayService } from "@src/module/pay/pay.service";

@Controller("pay")
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Get("ping")
  ping(): string {
    return this.payService.ping();
  }
}
