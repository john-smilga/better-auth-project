'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/form';
import { registerSchema, type RegisterFormData } from '../../schemas';
import { useRegisterMutation } from '../../queries';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegisterMutation();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: 'john',
      email: 'johnsmilga@gmail.com',
      password: 'secret123',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync(data);
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
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Enter your information to create a new account</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className='space-y-4'>
            {form.formState.errors.root && <div className='text-sm text-destructive'>{form.formState.errors.root.message}</div>}
            <FormInput control={form.control} name='name' label='Name' type='text' placeholder='John Doe' />
            <FormInput control={form.control} name='email' label='Email' type='email' placeholder='you@example.com' />
            <FormInput control={form.control} name='password' label='Password' type='password' placeholder='••••••••' />
          </CardContent>
          <CardFooter className='mt-6'>
            <Button type='submit' className='w-full' disabled={registerMutation.isPending}>
              {registerMutation.isPending ? 'Creating account...' : 'Create Account'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
