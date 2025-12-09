'use client';

import { Button } from '@/components/ui/button';
import { GithubIcon } from '@/components/ui/github-icon';
import { useGithubSignInMutation } from '../../queries/use-github-sign-in-mutation';

interface GithubSignInButtonProps {
  callbackURL?: string;
  onError?: (error: Error) => void;
  className?: string;
}

export function GithubSignInButton({ callbackURL = '/dashboard', onError, className }: GithubSignInButtonProps) {
  const githubSignInMutation = useGithubSignInMutation();

  const handleGitHubSignIn = async () => {
    try {
      await githubSignInMutation.mutateAsync({ callbackURL });
    } catch (error) {
      const errorMessage = error instanceof Error ? error : new Error('Failed to sign in with GitHub');
      if (onError) {
        onError(errorMessage);
      }
    }
  };

  return (
    <Button type='button' variant='outline' className={className} onClick={handleGitHubSignIn} disabled={githubSignInMutation.isPending}>
      <GithubIcon className='mr-2 h-4 w-4' />
      {githubSignInMutation.isPending ? 'Signing in...' : 'GitHub'}
    </Button>
  );
}
