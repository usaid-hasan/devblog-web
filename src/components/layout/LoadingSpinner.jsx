import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function LoadingSpinner() {
  useEffect(() => {
    const root = document.getElementById('root');
    root.setAttribute('inert', '');
    return () => root.removeAttribute('inert');
  });

  return createPortal(
    <div role="progressbar" aria-label="loading" className="fixed inset-0 z-40 cursor-wait bg-white/40 transition dark:bg-white/20">
      <div className="flex h-full">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mx-auto h-auto w-full max-w-[theme('spacing.16')] text-orange-500">
          <g className="origin-center animate-spinback">
            <circle fill="currentColor" r="1" cx="12" cy="3" className="animate-inflate" />
            <circle fill="currentColor" r="1" cx="16.5" cy="4.2" className="animate-inflate animation-delay-[.1s]" />
            <circle fill="currentColor" r="1" cx="19.8" cy="7.5" className="animate-inflate animation-delay-[.2s]" />
            <circle fill="currentColor" r="1" cx="21" cy="12" className="animate-inflate animation-delay-[.3s]" />
            <circle fill="currentColor" r="1" cx="19.8" cy="16.5" className="animate-inflate animation-delay-[.4s]" />
            <circle fill="currentColor" r="1" cx="16.5" cy="19.8" className="animate-inflate animation-delay-[.5s]" />
            <circle fill="currentColor" r="1" cx="12" cy="21" className="animate-inflate animation-delay-[.6s]" />
            <circle fill="currentColor" r="1" cx="7.5" cy="19.8" className="animate-inflate animation-delay-[.7s]" />
            <circle fill="currentColor" r="1" cx="4.2" cy="16.5" className="animate-inflate animation-delay-[.8s]" />
            <circle fill="currentColor" r="1" cx="3" cy="12" className="animate-inflate animation-delay-[.9s]" />
            <circle fill="currentColor" r="1" cx="4.2" cy="7.5" className="animate-inflate animation-delay-[1s]" />
            <circle fill="currentColor" r="1" cx="7.5" cy="4.2" className="animate-inflate animation-delay-[1.1s]" />
          </g>
        </svg>
      </div>
    </div>,
    document.body,
  );
}
