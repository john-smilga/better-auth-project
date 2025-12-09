'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { FormInput, FormError } from '@/components/form';
import { loginSchema, type LoginFormData } from '../../schemas';
import { useLoginMutation } from '../../queries';
import { GithubSignInButton } from '../github-sign-in-button/github-sign-in-button';

export function LoginForm() {
  const loginMutation = useLoginMutation();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'johnsmilga@gmail.com',
      password: 'secret123',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
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
            {loginMutation.isError && <FormError message={loginMutation.error?.message} />}
            <FormInput control={form.control} name='email' label='Email' type='email' placeholder='you@example.com' />
            <FormInput control={form.control} name='password' label='Password' type='password' placeholder='••••••••' />
          </CardContent>
          <CardFooter className='flex flex-col gap-4 mt-6'>
            <Button type='submit' className='w-full' disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
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
