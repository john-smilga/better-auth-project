import Link from 'next/link';

import { RegisterForm } from '@/features/auth/components';

export default function RegisterPage() {
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-4'>
        <RegisterForm />
        <div className='text-center text-sm'>
          Already have an account?{' '}
          <Link href='/login' className='text-primary underline underline-offset-4 hover:no-underline'>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
