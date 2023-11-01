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
  balanceAmount: number;
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
  isPartialCancelable?: boolean;
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

export const TOSS_DUMMY_RESPONSE: TossPaymentResponse = {
  mId: "tosspayments",
  version: "2022-11-16",
  lastTransactionKey: "B7103F204998813B889C77C043D09502",
  paymentKey: "5zJ4xY7m0kODnyRpQWGrN2xqGlNvLrKwv1M9ENjbeoPaZdL6",
  orderId: "a4CWyWY5m89PNh7xJwhk1",
  orderName: "토스 티셔츠 외 2건",
  currency: "KRW",
  method: "카드",
  status: "DONE",
  requestedAt: "2021-01-01T10:01:30+09:00",
  approvedAt: "2021-01-01T10:05:40+09:00",
  useEscrow: false,
  cultureExpense: false,
  card: {
    amount: 15000,
    issuerCode: "61",
    acquirerCode: "31",
    number: "12341234****123*",
    installmentPlanMonths: 0,
    isInterestFree: false,
    interestPayer: null,
    approveNo: "00000000",
    useCardPoint: false,
    cardType: "신용",
    ownerType: "개인",
    acquireStatus: "READY",
  },
  virtualAccount: null,
  transfer: null,
  mobilePhone: null,
  giftCertificate: null,
  cashReceipt: null,
  cashReceipts: null,
  receipt: {
    url: "https://merchants.tosspayments.com/web/serve/merchant/test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq/receipt/5zJ4xY7m0kODnyRpQWGrN2xqGlNvLrKwv1M9ENjbeoPaZdL6",
  },
  checkout: {
    url: "https://api.tosspayments.com/v1/payments/5zJ4xY7m0kODnyRpQWGrN2xqGlNvLrKwv1M9ENjbeoPaZdL6/checkout",
  },
  discount: null,
  cancels: null,
  secret: null,
  type: "NORMAL",
  easyPay: null,
  country: "KR",
  failure: null,
  totalAmount: 15000,
  balanceAmount: 15000,
  suppliedAmount: 13636,
  vat: 1364,
  taxFreeAmount: 0,
  taxExemptionAmount: 0,
};
