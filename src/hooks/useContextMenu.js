import { useCallback, useEffect, useRef, useState } from 'react';

export default function useContextMenu() {
  const dialogRef = useRef(null);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const focusRef = useRef(null);

  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const { current: dialog } = dialogRef;
    if (isOpened) {
      dialog.show();
      focusRef.current = menuRef.current.firstElementChild;
      focusRef.current.firstElementChild.focus();
    } else {
      dialog.close();
    }
  }, [isOpened]);

  const handleBlur = useCallback((e) => {
    if (!e.currentTarget.matches(':focus-within') && !btnRef.current?.matches(':hover, :focus-within, :active')) setIsOpened(false);
  }, []);

  const handleKey = useCallback((e) => {
    const currentItem = focusRef.current;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!currentItem.nextElementSibling) return;
        currentItem.nextElementSibling.firstElementChild.focus();
        focusRef.current = currentItem.nextElementSibling;
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!currentItem.previousElementSibling) return;
        currentItem.previousElementSibling.firstElementChild.focus();
        focusRef.current = currentItem.previousElementSibling;
        break;
      case 'Escape':
        setIsOpened(false);
        break;
      default:
    }
  }, []);

  const handleMenuOpen = useCallback(() => { setIsOpened((s) => !s); }, []);
  const handleMenuClose = useCallback(() => { setIsOpened(false); }, []);

  return {
    refs: { btnRef, menuRef, dialogRef },
    props: { onKeyDown: handleKey, onBlur: handleBlur },
    handles: { handleMenuOpen, handleMenuClose },
  };
}
