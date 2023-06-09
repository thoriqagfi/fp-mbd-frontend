import { ApiError, ApiReturn } from "@/types/api";
import { AxiosError } from "axios";

type ToastMessage<T> = {
  loading: string;
  success: (res: ApiReturn<T>) => string;
  error: (err: AxiosError<ApiError>) => string;
}

export const DEFAULT_TOAST_MESSAGE: ToastMessage<unknown> = {
  loading: "Loading...",
  success: (res) => {
    return res.message || "Success";
  },
  error: (err) => {
    return err?.response?.data?.message || "Terjadi kesalahan, mohon coba beberapa saat lagi";
  }
}