import { useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  if (location.pathname !== '/') return null;

  return (
    <div className="sticky inset-0 top-24 hidden h-auto w-full flex-col gap-4 lg:flex">
      {/* <aside className="rounded-md border bg-white text-sm shadow-md transition-colors dark:border-zinc-800 dark:bg-neutral-700">
        <a href={import.meta.env.VITE_GIT_URL} target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-4 p-4 transition-colors hover:text-lime-600">
          <span className="text-sm font-semibold tracking-wide">Github Repo</span>
          <div className="h-6 w-6 transition ease-out group-hover:scale-125">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden viewBox="0 0 512 512">
              <title>Github logo</title>
              <path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z" />
            </svg>
          </div>
        </a>
      </aside> */}

      <footer className="rounded-md border bg-white p-4 text-sm text-zinc-500 shadow-md transition-colors dark:border-zinc-800 dark:bg-neutral-700 dark:text-zinc-300">
        <nav className="mb-4">
          <ul className="grid grid-flow-col grid-rows-2 justify-between gap-1 [&_a:hover]:text-orange-500 [&_a]:transition-colors">
            <li><a href="/#">About</a></li>
            <li><a href="/#">Terms of service</a></li>
            <li><a href="/#">Privacy policy</a></li>
            <li><a href="/#">Cookie policy</a></li>
          </ul>
        </nav>

        <div className="text-center text-zinc-400 transition">
          <p>
            &copy;
            {' '}
            {import.meta.env.VITE_APP_NAME}
            .
            {' '}
            All rights reserved.
          </p>
          <p>Project built by Usaid Hasan</p>
        </div>
      </footer>
    </div>
  );
}
