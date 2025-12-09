import { authClient } from '@/lib/auth-client';
import type { RegisterFormData } from '../schemas';
import { useAuthMutation } from './use-auth-mutation-wrapper';

export const useRegisterMutation = () => {
  return useAuthMutation<RegisterFormData>(async (data: RegisterFormData) => {
    return await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  });
};
