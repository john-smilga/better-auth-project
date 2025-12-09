import { authClient } from '@/lib/better-auth/auth-client';

import { useAuthMutation } from './use-auth-mutation-wrapper';

type GithubSignInOptions = {
  callbackURL?: string;
};

export const useGithubSignInMutation = () => {
  return useAuthMutation<GithubSignInOptions>(async (options: GithubSignInOptions = {}) => {
    return authClient.signIn.social({
      provider: 'github',
      callbackURL: options.callbackURL || '/dashboard',
    });
  });
};
