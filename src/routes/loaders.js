import { redirect } from 'react-router-dom';
import { getUser, userFetched, fetchUser } from '@/client';

export async function rootLoader() {
  if (userFetched()) return null;

  await fetchUser();
  return null;
}

export async function authLoader({ request }) {
  // This is necessary because loaders are called in parallel and rootLoader might not be called yet.
  if (!userFetched()) await fetchUser();
  if (getUser()) return null;

  const { pathname } = new URL(request.url);
  window.location.state = pathname;
  return redirect('/signin');
}
