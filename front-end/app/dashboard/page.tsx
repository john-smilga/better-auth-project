import { requireUser } from '@/features/auth/actions';

import { DashboardContent } from './dashboard-content';

export default async function DashboardPage() {
  const user = await requireUser();

  return <DashboardContent user={user} />;
}
