'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/form';
import { loginSchema, type LoginFormData } from '../../schemas';
import { useLoginMutation } from '../../queries';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'johnsmilga@gmail.com',
      password: 'secret123',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      router.push('/dashboard');
    } catch (error) {
      form.setError('root', {
        message: error instanceof Error ? error.message : 'An error occurred',
      });
    }
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
            {form.formState.errors.root && <div className='text-sm text-destructive'>{form.formState.errors.root.message}</div>}
            <FormInput control={form.control} name='email' label='Email' type='email' placeholder='you@example.com' />
            <FormInput control={form.control} name='password' label='Password' type='password' placeholder='••••••••' />
          </CardContent>
          <CardFooter className='mt-6'>
            <Button type='submit' className='w-full' disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
