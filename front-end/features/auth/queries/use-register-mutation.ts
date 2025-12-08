import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';
import type { RegisterFormData } from '../schemas';

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const result = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      if (result.error) {
        throw new Error(result.error.message);
      }
      return result;
    },
    onSuccess: () => {
      // Invalidate user query cache for client-side components
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
  });
};
