import Link from 'next/link';

import { LoginForm } from '@/features/auth/components';

export default function LoginPage() {
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-4'>
        <LoginForm />
        <div className='text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link href='/register' className='text-primary underline underline-offset-4 hover:no-underline'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
