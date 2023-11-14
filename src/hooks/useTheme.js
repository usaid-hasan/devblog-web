import { useCallback, useEffect, useState } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme')
    ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  const toggleTheme = useCallback((e) => setTheme((currentTheme) => {
    if (e.type === 'change' && localStorage.getItem('theme')) return currentTheme;

    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    if (e.type === 'click') localStorage.setItem('theme', newTheme);

    return newTheme;
  }), []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', toggleTheme);
    return () => media.removeEventListener('change', toggleTheme);
  }, [toggleTheme]);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  return { theme, toggleTheme };
}
