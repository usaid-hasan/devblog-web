import { formatDistanceToNow } from 'date-fns';

export function getAvatarUrl(avatar, size = '80') {
  if (import.meta.env.DEV) return '/avatar.png';

  const baseUrl = new URL(import.meta.env.VITE_GRAVATAR_URL);

  if (!avatar) {
    baseUrl.searchParams.append('d', 'mp');
    return baseUrl;
  }

  const url = new URL(avatar, baseUrl);
  url.searchParams.append('d', 'retro');
  url.searchParams.append('s', size);
  return url;
}

export function formatTime(time) {
  return formatDistanceToNow(new Date(time), { addSuffix: true });
}
