import { Injectable } from "@nestjs/common";

@Injectable()
export class PayService {
  public ping() {
    return "pong";
  }
}
