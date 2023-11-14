import { memo } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from '@/hooks';

export default memo(function ThemeBtn() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" aria-label="toggle dark mode" onClick={toggleTheme} className="highlight h-8 w-8 rounded-full p-1">
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
});
