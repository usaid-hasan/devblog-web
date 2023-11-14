import { userFetched, fetchUser } from '@/client';

export default async function rootLoader() {
  if (userFetched()) return null;

  await fetchUser();
  return null;
}
