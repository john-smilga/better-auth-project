import { authClient } from '@/lib/auth-client';
import type { LoginFormData } from '../schemas';
import { useAuthMutation } from './use-auth-mutation-wrapper';

export const useLoginMutation = () => {
  return useAuthMutation<LoginFormData>(async (data: LoginFormData) => {
    return await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
  });
};
