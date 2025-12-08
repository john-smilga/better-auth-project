// Error normalization for HTTP requests

export class HttpError extends Error {
  constructor(public status: number, public statusText: string, public data?: unknown) {
    super(`HTTP Error ${status}: ${statusText}`);
    this.name = 'HttpError';
  }
}

export const normalizeError = (error: unknown): Error => {
  if (error instanceof HttpError) {
    return error;
  }
  if (error instanceof Error) {
    return error;
  }
  return new Error(String(error));
};
