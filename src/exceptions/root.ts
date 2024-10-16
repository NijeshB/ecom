export class HttpException extends Error {
  message: string;
  errorCode: any;
  statusCode: number;
  errors: ErrorCode;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    error: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = error;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  PRODUCT_NOT_FOUND = 1004,
  ADDRESS_NOT_FOUND = 1005,
  ADDRESS_DOES_NOT_BELONG = 1006,
  CART_NOT_FOUND = 1007,
  CART_DOES_NOT_BELONG = 1008,
  ORDER_NOT_FOUND = 1009,
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_ERROR = 3001,
  UNAUTHORIZED = 4001,
}
