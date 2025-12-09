import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='w-full max-w-2xl space-y-6 text-center'>
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
          Welcome to Better Auth
        </h1>
        <p className='text-lg text-muted-foreground sm:text-xl'>
          Because authentication shouldn&apos;t be a pain in the auth
        </p>
        <div className='pt-4'>
          <Button asChild size='lg'>
            <Link href='/login'>Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
