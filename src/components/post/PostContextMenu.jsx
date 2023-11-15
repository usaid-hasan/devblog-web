import { EllipsisHorizontalIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useContextMenu } from '@/hooks';
import DeleteBtn from './DeleteBtn';

export default function PostContextMenu({ id }) {
  const {
    refs: { btnRef, menuRef, dialogRef },
    props: { onBlur, onKeyDown },
    handles: { handleMenuOpen, handleMenuClose },
  } = useContextMenu();

  return (
    <div className="relative">
      <button type="button" onClick={handleMenuOpen} ref={btnRef} aria-label="open context menu" className="highlight h-8 w-8 rounded-full p-1.5">
        <EllipsisHorizontalIcon />
      </button>

      <dialog {...{ onBlur, onKeyDown }} ref={dialogRef} className="absolute left-auto right-0 top-full z-10 min-w-[theme('spacing.40')] origin-top-right rounded-md border bg-white p-1 shadow-md transition-colors dark:border-zinc-800 dark:bg-neutral-700">
        <menu ref={menuRef} className="divide-y text-sm text-zinc-700 transition-colors dark:divide-zinc-800 dark:text-zinc-100 [&>*]:transition-colors">
          <li>
            <DeleteBtn onClick={handleMenuClose} id={id} className="highlight flex w-full items-center gap-2 rounded-md p-2">
              <TrashIcon className="h-5 w-5" />
              Delete
            </DeleteBtn>
          </li>
        </menu>
      </dialog>
    </div>
  );
}
