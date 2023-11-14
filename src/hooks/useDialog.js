import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

export default function useDialog(ref, open) {
  const modalRef = useRef();

  const [isOpened, setIsOpened] = useState(open ?? true);

  useImperativeHandle(ref, () => ({
    openModal: () => { setIsOpened(true); },
    closeModal: () => { modalRef.current.classList.add('animate-slideout'); },
  }), []);

  useEffect(() => {
    const { current: dialog } = modalRef;
    if (isOpened) {
      dialog?.showModal();
    } else {
      dialog?.close();
      dialog?.classList.remove('animate-slideout');
    }

    return () => { dialog?.open && dialog.close(); };
  }, [isOpened]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    if (e.target === modalRef.current) modalRef.current.classList.add('animate-slideout');
  }, []);

  const handleAnimation = useCallback((e) => {
    if (e.animationName === 'slideout' && e.target === modalRef.current) setIsOpened(false);
  }, []);

  const handleDialogClick = useCallback((e) => {
    if (e.currentTarget.dataset.modalContainer === 'inner') e.stopPropagation();
    else modalRef.current.classList.add('animate-slideout');
  }, []);

  return {
    refs: { modalRef },
    props: { onAnimationEnd: handleAnimation, onCancel: handleCancel },
    handles: { handleDialogClick },
    state: { isOpened },
  };
}
