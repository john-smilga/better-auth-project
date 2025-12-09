'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

import type { LoginFormData, RegisterFormData } from './schemas';

const AUTH_REDIRECT = '/dashboard';

type ActionResult = { error?: string };

function extractErrorMessage(result: unknown): string | undefined {
  if (result && typeof result === 'object' && 'error' in result) {
    const error = (result as { error?: { message?: string } }).error;
    if (error?.message) {
      return error.message;
    }
  }
  return undefined;
}

const authHeaders = () => ({
  headers: {
    cookie: cookies().toString(),
  },
});

export async function loginAction(data: LoginFormData): Promise<ActionResult> {
  const response = await auth.api.signInEmail({
    body: {
      email: data.email,
      password: data.password,
      callbackURL: AUTH_REDIRECT,
    },
    ...authHeaders(),
  });

  const errorMessage = extractErrorMessage(response);
  return errorMessage ? { error: errorMessage } : {};
}

export async function registerAction(data: RegisterFormData): Promise<ActionResult> {
  const response = await auth.api.signUpEmail({
    body: {
      email: data.email,
      password: data.password,
      name: data.name,
      callbackURL: AUTH_REDIRECT,
    },
    ...authHeaders(),
  });

  const errorMessage = extractErrorMessage(response);
  return errorMessage ? { error: errorMessage } : {};
}

export async function githubSignInAction(callbackURL = AUTH_REDIRECT): Promise<{ url?: string; error?: string }> {
  const response = await auth.api.signInSocial({
    body: {
      provider: 'github',
      callbackURL,
    },
    ...authHeaders(),
  });

  const errorMessage = extractErrorMessage(response);
  if (errorMessage) {
    return { error: errorMessage };
  }

  return {
    url: (response as { data?: { url?: string } })?.data?.url,
  };
}

export async function logoutAction(): Promise<never> {
  await auth.api.signOut(authHeaders());
  redirect('/login');
}

export async function getCurrentUser() {
  const session = await auth.api.getSession(authHeaders());
  return (session as { data?: { user?: unknown } })?.data?.user;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return user;
}
