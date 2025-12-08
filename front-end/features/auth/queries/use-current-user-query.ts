import { useQuery } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const session = await authClient.getSession();
      return session.data?.user ?? null;
    },
  });
};
