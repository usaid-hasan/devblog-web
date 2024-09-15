import { Outlet, useNavigation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import AuthBtn from './AuthBtn';
import ThemeBtn from './ThemeBtn';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ ErrorBoundary }) {
  const { state } = useNavigation();

  let outlet;
  if (state === 'loading') outlet = <LoadingSpinner />;
  else if (ErrorBoundary) outlet = <ErrorBoundary />;
  else outlet = <Outlet />;

  return (
    <>
      {/* <aside className="w-[100vw] bg-neutral-800 text-center text-base font-bold text-white lg:hidden">
        <a href={import.meta.env.VITE_GIT_URL} target="_blank" rel="noreferrer">
          Github Repo &rarr;
        </a>
      </aside> */}

      <div className="min-h-screen bg-zinc-100 text-zinc-700 transition-colors dark:bg-neutral-800 dark:text-zinc-100">
        <header className="sticky top-0 z-30 h-16 border-b border-t-2 border-t-orange-500 bg-white/80 shadow-md backdrop-blur-xs transition-colors dark:border-zinc-800 dark:border-t-orange-500 dark:bg-neutral-900/80">
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
            <a href="/">
              <span className="sr-only">Home</span>
              <img src="/logo.svg" alt={`Logo of ${import.meta.env.VITE_APP_NAME}`} width="40" height="40" className="h-10 w-auto" />
            </a>

            <div className="flex h-full items-center justify-center gap-2">
              <ThemeBtn />
              <AuthBtn />
            </div>
          </div>
        </header>

        <div className="mx-auto grid min-h-[calc(100vh_-_theme('spacing.16'))] max-w-7xl items-start justify-items-center pt-8 lg:grid-cols-[.4fr_1fr_.4fr] lg:px-4">
          <Navbar />
          <main className="mb-16 w-full max-w-2xl px-2 lg:col-start-2 lg:mb-8">
            {outlet}
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
