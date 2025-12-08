React Query global error and success toast handler setup.

```tsx
// app/layout.tsx
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
```

React Query client configuration with global error and success handlers.

```tsx
// lib/react-query.ts
import { QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { isValidationError } from './http/errors';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        // Only show toast for string errors, not validation errors
        // Validation errors are handled via setFormValidationErrors in forms
        if (isValidationError(error)) {
          return; // Don't show toast for field errors
        }
        
        if (typeof error === 'string') {
          toast.error(error);
        } else {
          toast.error('An unexpected error occurred');
        }
      },
      onSuccess: (data, variables, context, mutation) => {
        // Check if mutation has a success message in meta
        const meta = mutation.meta;
        if (meta && typeof meta === 'object' && 'successMessage' in meta && typeof meta.successMessage === 'string') {
          toast.success(meta.successMessage);
        }
      },
    },
    queries: {
      onError: (error) => {
        if (typeof error === 'string') {
          toast.error(error);
        } else {
          toast.error('Failed to fetch data');
        }
      },
      // Queries usually don't need success toasts (they just show data)
    },
  },
});
```

Providers setup for React Query.

```tsx
// app/providers.tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

Usage in root layout.

```tsx
// app/layout.tsx
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Providers>
          {children}
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
```

Mutation example without success toast (navigation provides feedback).

```tsx
// features/auth/queries/useLoginMutation.ts
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
        userSchema
      ),
    onSuccess: (user) => {
      setUser(user);
      router.push('/dashboard');
      // No toast needed - navigation is the feedback
    },
  });
}
```

Mutation example with success toast using meta.

```tsx
// features/profile/queries/useUpdateProfileMutation.ts
'use client';

import { useMutation } from '@tanstack/react-query';

import { httpRequest } from '@/lib/http/httpRequest';
import type { AppError } from '@/lib/http/errors';
import { userSchema, type User } from '../schemas/userSchema';

export interface ProfileFormValues {
  name: string;
  email: string;
}

export function useUpdateProfileMutation() {
  return useMutation<User, AppError, ProfileFormValues>({
    mutationKey: ['profile', 'update'],
    mutationFn: (values: ProfileFormValues) =>
      httpRequest(
        {
          url: '/profile',
          method: 'PUT',
          data: values,
        },
        userSchema
      ),
    meta: {
      successMessage: 'Profile updated successfully',
    },
  });
}
```

Form component with error handling (errors automatically shown via toast).

```tsx
// app/login/page.tsx
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
    resolver: zodResolver(loginSchema),
  });

  const { mutate: login, isPending } = useLoginMutation();

  const onSubmit = (values: LoginFormValues) => {
    login(values, {
      onError: (err) => {
        setFormValidationErrors(err, setError);
        // String errors automatically shown via toast! 🎉
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

      <button disabled={isPending} className="bg-blue-600 text-white px-4 py-2 rounded">
        {isPending ? 'Logging in…' : 'Login'}
      </button>
    </form>
  );
}
```

## Benefits

- **Automatic error handling**: All mutation/query errors automatically show toast
- **Validation errors excluded**: Field errors handled in forms, not shown as toasts
- **Optional success toasts**: Add success messages via `meta.successMessage` only where needed
- **Set up once**: Configure in React Query client, works everywhere
- **Clean component code**: No manual toast calls needed for errors

