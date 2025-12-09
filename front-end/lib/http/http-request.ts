import { type z } from 'zod';

import { httpClient } from './client';
import { HttpError, normalizeError } from './errors';

type HttpRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
};

export const httpRequest = async <T extends z.ZodType>(endpoint: string, schema: T, options: HttpRequestOptions = {}): Promise<z.infer<T>> => {
  try {
    const response = await fetch(`${httpClient.baseURL}${endpoint}`, {
      method: options.method || 'GET',
      headers: {
        ...httpClient.headers,
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText, await response.json().catch(() => {}));
    }

    const data = await response.json();
    return schema.parse(data);
  } catch (error) {
    throw normalizeError(error);
  }
};
