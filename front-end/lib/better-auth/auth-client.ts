import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  // baseURL is optional when auth server is on the same domain
});
