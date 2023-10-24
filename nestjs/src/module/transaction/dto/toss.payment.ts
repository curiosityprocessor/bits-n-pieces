export class TossPostPaymentRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface TossPaymentResponse {
  version: string;
  paymentKey: string;
  type: TossPaymentType;
  orderId: string;
  orderName: string;
  mId: string;
  currency: string;
  method: TossPaymentMethod;
  totalAmount: number;
  status: TossPaymentStatus;
  /** yyyy-MM-dd'T'HH:mm:ss±hh:mm */
  requestedAt: string;
  /** yyyy-MM-dd'T'HH:mm:ss±hh:mm */
  approvedAt: string;
  useEscrow: boolean;
  lastTransactionKey?: string;
  suppliedAmount: number;
  /** 소수점 첫째자리 반올림 */
  vat: number;
  cultureExpense: boolean;
  taxFreeAmount: number;
  taxExemptionAmount: number;
  cancels: TossPaymentCancelHistory[];
  isPartialCancelable: boolean;
  card?: TossPaymentCard;
  virtualAccount?: TossVirtualAccount;
  secret?: string;
  mobilePhone?: {
    customerMobilePhone: string;
    settlementStatus: TossPaymentSettlementStatus;
    receiptUrl: string;
  };
  giftCertificate?: {
    approveNo: string;
    settlementStatus: TossPaymentSettlementStatus;
  };
  transfer?: {
    bankCode: string;
    settlementStatus: TossPaymentSettlementStatus;
  };
  receipt?: {
    url: string;
  };
  checkout?: {
    url: string;
  };
  easyPay?: {
    provider: string;
    amount: number;
    discountAmount: number;
  };
  country: string;
  failure?: {
    code: string;
    message: string;
  };
  cashReceipt?: {
    type: "소득공제" | "지출증빙" | "미발행";
    receiptKey: string;
    issueNumber: string;
    receiptUrl: string;
    amount: number;
    taxFreeAmount: number;
  };
  cashReceipts?: CashReceiptHistory[];
  discount?: {
    amount: number;
  };
}

type TossPaymentType = "NORMAL" | "BILING" | "BRANDPAY";

type TossPaymentMethod =
  | "카드"
  | "가상계좌"
  | "간편결제"
  | "휴대폰"
  | "계좌이체"
  | "문화상품권"
  | "도서문화상품권"
  | "게임문화상품권";

type TossPaymentStatus =
  | "READY"
  | "IN_PROGRESS"
  | "WAITING_FOR_DEPOSIT"
  | "DONE"
  | "CANCELED"
  | "PARTIAL_CANCELED"
  | "ABORTED"
  | "EXPIRED";

export interface TossPaymentCancelHistory {
  cancelAmount: number;
  cancelReason: number;
  taxFreeAmount: number;
  taxExemptionAmount: number;
  refundableAmount: number;
  easyPayDiscountAmount: number;
  /** yyyy-MM-dd'T'HH:mm:ss±hh:mm */
  canceledAt: string;
  transactionKey: string;
  receiptKey?: string;
}

interface TossPaymentCard {
  amount: number;
  issuerCode: string;
  acquirerCode?: string;
  number: string;
  installmentPlanMonths: number;
  approveNo: string;
  useCardPoint: boolean;
  cardType: TossPaymentCardType;
  ownerType: TossPaymentCardOwnerType;
  acquireStatus: TossPaymentCardAcquireStatus;
  isInterestFree: boolean;
  interestPayer?: TossPaymentCardInterestPayer;
}

type TossPaymentCardType = "신용" | "체크" | "기프트" | "미확인";

type TossPaymentCardOwnerType = "개인" | "법인" | "미확인";

type TossPaymentCardAcquireStatus =
  | "READY"
  | "REQUESTED"
  | "COMPLETED"
  | "CANCEL_REQUESTED"
  | "CANCELED";

type TossPaymentCardInterestPayer = "BUYER" | "CARD_COMPANY" | "MERCHANT";

interface TossVirtualAccount {
  accountType: string;
  accountNumber: string;
  bankCode: string;
  customerName: string;
  /** yyyy-MM-dd'T'HH:mm:ss */
  dueDate: string;
  refundStatus: TossPaymentRefundState;
  expired: boolean;
  settlementStatus: TossPaymentSettlementStatus;
  refundReceiveAccount: {
    bankCode: string;
    accountNumber: string;
    holderName: string;
  };
}

type TossPaymentSettlementStatus = "INCOMPLETED" | "COMPLETED";

type TossPaymentRefundState =
  | "NONE"
  | "PENDING"
  | "FAILED"
  | "PARTIAL_FAILED"
  | "COMPLETED";

interface CashReceiptHistory {
  receiptKey: string;
  orderId: string;
  orderName: string;
  type: string;
  issueNumber: string;
  receiptUrl: string;
  businessNumber: string;
  transactionType: "CONFIRM" | "CANCEL";
  amount: number;
  taxFreeAmount: number;
  issueStatus: "IN_PROGRESS" | "COMPLETED" | "FAILED";
  failure: string;
  customerIdentityNumber: string;
  requestedAt: string;
}
