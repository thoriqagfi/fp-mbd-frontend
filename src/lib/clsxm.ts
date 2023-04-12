import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function clsxm(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}