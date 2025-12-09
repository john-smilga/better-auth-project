'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { checkBetterAuthError, extractErrorMessage } from '@/lib/utils';

/**
 * Wraps auth mutations with automatic navigation and error handling
 */
export function useAuthMutation<TVariables>(mutationFn: (variables: TVariables) => Promise<void>) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      try {
        const result = await mutationFn(variables);
        checkBetterAuthError(result);
      } catch (error) {
        throw new Error(extractErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      router.push('/dashboard');
    },
  });
}
