//this class is responsuble about opreational errors (error that i can predict)
class ApiError extends Error {

  status: string;

  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {

    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    //isOperational means this error i can predict it
    this.isOperational = true;
  }
}
export default ApiError;
