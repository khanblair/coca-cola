import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper to check if viewport is mobile
export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 1024; // lg breakpoint
}
