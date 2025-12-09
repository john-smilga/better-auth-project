'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { GithubIcon } from '@/components/ui/github-icon';

import { githubSignInAction } from '../../actions';

type GithubSignInButtonProps = {
  readonly callbackURL?: string;
  readonly className?: string;
};

export function GithubSignInButton({ callbackURL = '/dashboard', className }: GithubSignInButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleGitHubSignIn = () => {
    startTransition(async () => {
      const result = await githubSignInAction(callbackURL);

      if (result?.url) {
        router.push(result.url);
      }
    });
  };

  return (
    <Button type='button' variant='outline' className={className} onClick={handleGitHubSignIn} disabled={isPending}>
      <GithubIcon className='mr-2 h-4 w-4' />
      {isPending ? 'Signing in...' : 'GitHub'}
    </Button>
  );
}
