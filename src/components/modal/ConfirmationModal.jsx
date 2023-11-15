import { useCallback } from 'react';
import Dialog from './Dialog';

export default function ConfirmationModal({ action, children, dialogRef }) {
  const handleCancelBtn = useCallback(() => {
    dialogRef.current.closeModal();
  }, [dialogRef]);

  const handleConfirmBtn = useCallback(() => {
    dialogRef.current.closeModal();
    action();
  }, [dialogRef, action]);

  return (
    <Dialog ref={dialogRef} open={false} className="w-max max-w-[min(theme('maxWidth.md'),90vw)] animate-slidein overflow-hidden rounded-md border bg-white p-0 text-center text-base text-zinc-700 shadow-xl transition-colors backdrop:bg-gradient-to-b backdrop:from-white/40 dark:border-zinc-800 dark:bg-neutral-700 dark:text-zinc-100 dark:backdrop:from-white/20 lg:text-lg">
      <div className="w-full p-6">
        <p className="mb-4">
          <strong className="font-semibold">{children}</strong>
        </p>
        <div className="space-x-4 text-sm">
          <button type="button" onClick={handleConfirmBtn} className="btn self-center px-4 py-2">
            Yes
          </button>
          <button type="button" onClick={handleCancelBtn} className="highlight self-center rounded-md px-4 py-2 ring-1 ring-inset ring-current focus-visible:outline-offset-2">
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
}
