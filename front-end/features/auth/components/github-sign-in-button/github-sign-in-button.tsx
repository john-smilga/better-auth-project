'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GithubIcon } from '@/components/ui/github-icon';
import { authClient } from '@/lib/auth-client';

interface GithubSignInButtonProps {
  callbackURL?: string;
  onError?: (error: Error) => void;
  className?: string;
}

export function GithubSignInButton({ callbackURL = '/dashboard', onError, className }: GithubSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubSignIn = async () => {
    try {
      setIsLoading(true);
      await authClient.signIn.social({
        provider: 'github',
        callbackURL,
      });
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error instanceof Error ? error : new Error('Failed to sign in with GitHub');
      if (onError) {
        onError(errorMessage);
      }
    }
  };

  return (
    <Button type='button' variant='outline' className={className} onClick={handleGitHubSignIn} disabled={isLoading}>
      <GithubIcon className='mr-2 h-4 w-4' />
      {isLoading ? 'Signing in...' : 'GitHub'}
    </Button>
  );
}
