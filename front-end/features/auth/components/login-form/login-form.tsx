'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { FormError, FormInput } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';

import { loginAction } from '../../actions';
import { type LoginFormData, loginSchema } from '../../schemas';
import { GithubSignInButton } from '../github-sign-in-button/github-sign-in-button';

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'johnsmilga@gmail.com',
      // eslint-disable-next-line sonarjs/no-hardcoded-passwords
      password: 'secret123',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    startTransition(async () => {
      const result = await loginAction(data);

      if (result.error) {
        form.setError('root', { message: result.error });
        return;
      }

      router.push('/dashboard');
    });
  };

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className='space-y-4'>
            {form.formState.errors.root && <FormError message={form.formState.errors.root.message} />}
            <FormInput control={form.control} name='email' label='Email' type='email' placeholder='you@example.com' />
            <FormInput control={form.control} name='password' label='Password' type='password' placeholder='••••••••' />
          </CardContent>
          <CardFooter className='flex flex-col gap-4 mt-6'>
            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending ? 'Signing in...' : 'Sign In'}
            </Button>
            <div className='relative w-full'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
              </div>
            </div>
            <GithubSignInButton callbackURL='/dashboard' className='w-full' />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
