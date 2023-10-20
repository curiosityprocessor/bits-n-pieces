import { Injectable } from "@nestjs/common";

@Injectable()
export class TransactionService {
  public ping() {
    return "pong";
  }
}
