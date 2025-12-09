import { useQuery } from '@tanstack/react-query';

import { authClient } from '@/lib/better-auth/auth-client';

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const session = await authClient.getSession();
      // eslint-disable-next-line unicorn/no-null -- React Query requires null instead of undefined for "no data" state
      return session.data?.user ?? null;
    },
  });
};
