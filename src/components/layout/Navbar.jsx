import { NavLink } from 'react-router-dom';
import { Cog6ToothIcon, HomeIcon, PlusCircleIcon, UserIcon } from '@heroicons/react/20/solid';
import { useAuth } from '@/hooks';

const tabs = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/submit', label: 'Create', Icon: PlusCircleIcon },
  { to: '/profile', label: 'Profile', Icon: UserIcon },
  { to: '/settings', label: 'Settings', Icon: Cog6ToothIcon },
];

export default function Navbar() {
  const user = useAuth();

  if (!user) return null;

  return (
    <nav className="fixed bottom-0 right-0 z-10 w-full border-t bg-white/80 backdrop-blur-xs transition-colors dark:border-zinc-800 dark:bg-neutral-900/80 lg:sticky lg:inset-0 lg:top-24 lg:rounded-md lg:border lg:bg-white lg:px-2 lg:py-4 lg:shadow-md lg:backdrop-blur-none lg:dark:bg-neutral-700">
      <menu className="flex items-center justify-around lg:flex-col lg:items-stretch lg:gap-2">
        {tabs.map((tab) => (
          <li key={tab.to}>
            <NavLink to={tab.to} className="highlight flex flex-col items-center gap-2 rounded-md px-4 py-1.5 lg:flex-row lg:focus-visible:outline-offset-2">
              <tab.Icon className="h-6 w-6" />
              <span className="text-xs font-semibold tracking-wide lg:text-sm">
                {tab.label}
              </span>
            </NavLink>
          </li>
        ))}
      </menu>
    </nav>
  );
}
