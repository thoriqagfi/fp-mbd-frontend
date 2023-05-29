export type ApiReturn<T> = {
  success: boolean;
  message: string;
  data: T;
  code?: number;
};

export type ApiError = {
  message: string;
  code: number;
  success: boolean;
};