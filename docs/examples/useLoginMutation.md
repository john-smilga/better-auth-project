Axios client instance with base URL and credentials configuration.

```ts
// lib/http/client.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',        // adjust to your backend
  withCredentials: true,  // if you use cookies
});

```

Error normalization utility that converts axios errors and validation errors into a unified AppError type.

```ts
// lib/http/errors.ts
import axios from 'axios';
import { ZodError } from 'zod';

export type ValidationError = {
  fieldErrors: Record<string, string>;
};

export type AppError = string | ValidationError;

export function isValidationError(e: unknown): e is ValidationError {
  return !!e && typeof e === 'object' && 'fieldErrors' in e;
}

export function setFormValidationErrors<T extends Record<string, unknown>>(
  err: unknown,
  setError: (field: keyof T, error: { message: string }) => void
): void {
  if (isValidationError(err)) {
    Object.entries(err.fieldErrors).forEach(([field, message]) => {
      setError(field as keyof T, { message });
    });
  }
}

export function normalizeError(err: unknown): AppError {
  if (err instanceof ZodError) {
    // treat as generic backend contract issue
    return 'Invalid data received from server.';
  }
  
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const data = err.response?.data;

    // DRF validation errors: 400 with field names as keys and arrays of messages
    // Example DRF response format:
    // {
    //   "email": ["Enter a valid email address."],
    //   "password": ["This field may not be blank.", "Password must be at least 6 characters."]
    // }
    if (status === 400 && data && typeof data === 'object' && !Array.isArray(data) && !('message' in data) && !('error' in data)) {
      // Check if it looks like DRF field errors (field names as keys, arrays as values)
      const hasFieldErrors = Object.values(data).some(
        (value) => Array.isArray(value) && value.length > 0
      );

      if (hasFieldErrors) {
        // Convert DRF format { "field": ["error1", "error2"] } to { "field": "error1" }
        const fieldErrors: Record<string, string> = {};
        Object.entries(data).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0 && typeof messages[0] === 'string') {
            // Take first error message
            fieldErrors[field] = messages[0];
          }
        });

        if (Object.keys(fieldErrors).length > 0) {
          return { fieldErrors };
        }
      }
    }

    // Generic backend error
    const errorData = data && typeof data === 'object' && !Array.isArray(data) ? data : null;
    return (
      (errorData && 'message' in errorData && typeof errorData.message === 'string' ? errorData.message : null) ??
      (errorData && 'error' in errorData && typeof errorData.error === 'string' ? errorData.error : null) ??
      (err.message ?? 'Unexpected server error')
    );
  }

  if (err instanceof Error) {
    return err.message ?? 'Something went wrong';
  }

  return 'Something went wrong';
}

```

Zod schema for user data with email validation.

```ts
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
});

export type User = z.infer<typeof userSchema>;

```

Zod schema for login form with email and password validation.

```ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

```

HTTP request wrapper with optional Zod schema validation for response data.

```ts
import type { AxiosRequestConfig } from 'axios';
import type { ZodTypeAny } from 'zod';
import { z } from 'zod';

import { api } from './client';
import { normalizeError, type AppError } from './errors';

// Supports:
// 1) httpRequest<TResponse>(config) - without schema, must specify TResponse
// 2) httpRequest(config, schema) - with schema, TResult inferred from schema
export function httpRequest<TSchema extends ZodTypeAny>(
  config: AxiosRequestConfig,
  schema: TSchema
): Promise<z.infer<TSchema>>;

export function httpRequest<TResponse>(
  config: AxiosRequestConfig
): Promise<TResponse>;

export async function httpRequest<
  TResponse = unknown,
  TSchema extends ZodTypeAny | undefined = undefined,
  TResult = TSchema extends ZodTypeAny ? z.infer<TSchema> : TResponse
>(
  config: AxiosRequestConfig,
  schema?: TSchema
): Promise<TResult> {
  try {
    const res = await api.request<TResponse>(config);
    let data: unknown = res.data;

    if (schema) {
      data = schema.parse(data); // Zod validation of backend response
    }

    return data as TResult;
  } catch (err) {
    throw normalizeError(err);
  }
}

```

React Query mutation hook for login that validates the response with Zod schema.

```ts
'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { httpRequest } from '@/lib/http/httpRequest';
import type { AppError } from '@/lib/http/errors';
import { useAuthStore } from '../store/authStore';

import { loginSchema, type LoginFormValues } from '../schemas/loginSchema';
import { userSchema, type User } from '../schemas/userSchema';

export function useLoginMutation() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation<User, AppError>({
    mutationKey: ['auth', 'login'],
    mutationFn: (values: LoginFormValues) =>
      httpRequest(
        {
          url: '/auth/login',
          method: 'POST',
          data: values,
        },
        userSchema // Zod schema for RESPONSE
      ),
    onSuccess: (user) => {
      setUser(user);
      router.push('/dashboard');
    },
  });
}

```

Login page component with React Hook Form, Zod validation, and backend error handling.

```tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/loginSchema';
import { useLoginMutation } from '@/features/auth/queries/useLoginMutation';
import { setFormValidationErrors } from '@/lib/http/errors';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema), // FE Zod validation
  });

  const { mutate: login, error, isPending } = useLoginMutation();

  const onSubmit = (values: LoginFormValues) => {
    login(values, {
      onError: (err) => {
        setFormValidationErrors(err, setError);
        // String errors are handled via the `error` property from useMutation
        // which can be displayed in toast/banner elsewhere
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <input {...register('email')} placeholder="Email" className="border px-2 py-1" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <input {...register('password')} type="password" placeholder="Password" className="border px-2 py-1" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      {typeof error === 'string' && (
        <p className="text-red-500">{error}</p>
      )}

      <button disabled={isPending} className="bg-blue-600 text-white px-4 py-2 rounded">
        {isPending ? 'Logging in…' : 'Login'}
      </button>
    </form>
  );
}

```