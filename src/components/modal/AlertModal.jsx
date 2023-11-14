import { useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Alert from '../layout/Alert';
import Dialog from './Dialog';

export default function AlertModal({ message, type, open }) {
  const ref = useRef();

  const handleCancelBtn = useCallback(() => {
    ref.current.closeModal();
  }, []);

  return createPortal(
    <Dialog ref={ref} open={open} className="bottom-auto top-4 w-max max-w-[min(theme('maxWidth.md'),90vw)] animate-slidein overflow-hidden rounded-md border bg-white p-0 text-base text-zinc-700 shadow-xl transition-colors backdrop:bg-gradient-to-b backdrop:from-white/40 dark:border-zinc-800 dark:bg-neutral-700 dark:text-zinc-100 dark:backdrop:from-white/20 lg:text-lg">
      <div className="flex items-center px-2">
        <Alert message={message} type={type} modal />
        <button type="button" aria-label="close modal" onClick={handleCancelBtn} className="highlight rounded-full p-2">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
    </Dialog>,
    document.body,
  );
}
