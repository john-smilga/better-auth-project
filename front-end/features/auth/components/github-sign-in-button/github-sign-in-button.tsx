'use client';

import { Button } from '@/components/ui/button';
import { GithubIcon } from '@/components/ui/github-icon';
import { useGithubSignInMutation } from '../../queries/use-github-sign-in-mutation';

type GithubSignInButtonProps = {
  callbackURL?: string;
  className?: string;
};

export function GithubSignInButton({ callbackURL = '/dashboard', className }: GithubSignInButtonProps) {
  const githubSignInMutation = useGithubSignInMutation();

  const handleGitHubSignIn = () => {
    githubSignInMutation.mutate({ callbackURL });
  };

  return (
    <Button type='button' variant='outline' className={className} onClick={handleGitHubSignIn} disabled={githubSignInMutation.isPending}>
      <GithubIcon className='mr-2 h-4 w-4' />
      {githubSignInMutation.isPending ? 'Signing in...' : 'GitHub'}
    </Button>
  );
}
