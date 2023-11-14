import { useEffect } from 'react';

export default function usePageTitle(title) {
  useEffect(() => { document.title = `${title} | ${import.meta.env.VITE_APP_NAME}`; }, [title]);
}
