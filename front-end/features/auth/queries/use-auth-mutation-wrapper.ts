'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Wraps auth mutations with automatic navigation and error handling
 */
export function useAuthMutation<TVariables>(
  mutationFn: (variables: TVariables) => Promise<unknown>,
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      try {
        const result = await mutationFn(variables);
        // Check for better-auth error in result (if result has error property)
        if (
          result &&
          typeof result === 'object' &&
          'error' in result &&
          result.error &&
          typeof result.error === 'object' &&
          'message' in result.error &&
          typeof result.error.message === 'string'
        ) {
          throw new Error(result.error.message);
        }
      } catch (error) {
        // Extract error message from better-auth or use default
        const errorMessage =
          error instanceof Error ? error.message : 'There was an error';
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      router.push('/dashboard');
    },
  });
}

