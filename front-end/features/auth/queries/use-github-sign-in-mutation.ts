import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';

interface GithubSignInOptions {
  callbackURL?: string;
}

export const useGithubSignInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (options: GithubSignInOptions = {}) => {
      const result = await authClient.signIn.social({
        provider: 'github',
        callbackURL: options.callbackURL || '/dashboard',
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
