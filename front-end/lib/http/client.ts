// HTTP client configuration
// This file will be used for API requests

export const httpClient = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
};
