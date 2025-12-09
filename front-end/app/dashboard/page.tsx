'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useCurrentUserQuery } from '@/features/auth/queries';

import { DashboardContent } from './dashboard-content';

export default function DashboardPage() {
  const router = useRouter();
  const { data: user, isLoading, isError } = useCurrentUserQuery();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className='container mx-auto p-6'>
        <div className='flex items-center justify-center min-h-[400px]'>
          <p className='text-muted-foreground'>Loading...</p>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return null; // Will redirect via useEffect
  }

  return <DashboardContent user={user} />;
}
