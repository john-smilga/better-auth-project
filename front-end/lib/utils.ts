import { type ClassValue,clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Checks if the result contains a better-auth error and throws if found
 */
export function checkBetterAuthError(result: unknown): void {
  if (result && typeof result === 'object' && 'error' in result && result.error && typeof result.error === 'object' && 'message' in result.error && typeof result.error.message === 'string') {
    throw new Error(result.error.message);
  }
}

/**
 * Extracts error message from error or returns default message
 */
export function extractErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'There was an error';
}
