import { authClient } from '@/lib/auth-client';
import { useAuthMutation } from './use-auth-mutation-wrapper';

type GithubSignInOptions = {
  callbackURL?: string;
};

export const useGithubSignInMutation = () => {
  return useAuthMutation<GithubSignInOptions>(async (options: GithubSignInOptions = {}) => {
    return await authClient.signIn.social({
      provider: 'github',
      callbackURL: options.callbackURL || '/dashboard',
    });
  });
};
