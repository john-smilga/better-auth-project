import { authClient } from '@/lib/better-auth/auth-client';

import type { RegisterFormData } from '../schemas';
import { useAuthMutation } from './use-auth-mutation-wrapper';

export const useRegisterMutation = () => {
  return useAuthMutation<RegisterFormData>(async (data: RegisterFormData) => {
    return authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  });
};
