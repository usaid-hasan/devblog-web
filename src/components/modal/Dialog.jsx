import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { useDialog } from '@/hooks';

export default forwardRef(function Dialog({ open, className, children }, ref) {
  const {
    refs: { modalRef },
    state: { isOpened },
    handles: { handleDialogClick },
    props: { onAnimationEnd, onCancel },
  } = useDialog(ref, open);

  if (!isOpened) return null;

  return createPortal(
    <div onClick={handleDialogClick} role="none" data-modal-container="outer">
      <dialog ref={modalRef} {...{ onAnimationEnd, onCancel }} className={className}>
        <div onClick={handleDialogClick} role="none" data-modal-container="inner">
          {children}
        </div>
      </dialog>
    </div>,
    document.body,
  );
});
