'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { InferSelectModel } from 'drizzle-orm';
import { user } from '@/lib/db/schema';

type User = InferSelectModel<typeof user>;

export function DashboardContent({ user }: { user: User }) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/login');
  };

  return (
    <div className='container mx-auto p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <Button onClick={handleLogout} variant='outline'>
          Logout
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <p className='text-sm font-medium text-muted-foreground'>ID</p>
            <p className='text-sm'>{user.id}</p>
          </div>
          <div>
            <p className='text-sm font-medium text-muted-foreground'>Name</p>
            <p className='text-sm'>{user.name || 'Not set'}</p>
          </div>
          <div>
            <p className='text-sm font-medium text-muted-foreground'>Email</p>
            <p className='text-sm'>{user.email}</p>
          </div>
          <div>
            <p className='text-sm font-medium text-muted-foreground'>Email Verified</p>
            <p className='text-sm'>{user.emailVerified ? 'Yes' : 'No'}</p>
          </div>
          {user.image && (
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Image</p>
              <img src={user.image} alt='Profile' className='mt-2 h-20 w-20 rounded-full' />
            </div>
          )}
          <div>
            <p className='text-sm font-medium text-muted-foreground'>Created At</p>
            <p className='text-sm'>{new Date(user.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className='text-sm font-medium text-muted-foreground'>Updated At</p>
            <p className='text-sm'>{new Date(user.updatedAt).toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
