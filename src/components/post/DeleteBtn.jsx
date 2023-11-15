import { memo, useCallback, useRef } from 'react';
import { useDeletePost } from '@/api';
import LoadingSpinner from '../layout/LoadingSpinner';
import AlertModal from '../modal/AlertModal';
import ConfirmationModal from '../modal/ConfirmationModal';

export default memo(function DeleteBtn({ id, className, onClick, children }) {
  const { deletePost, loading, error } = useDeletePost(id);

  const ref = useRef();
  const openModal = useCallback(() => {
    onClick();
    ref.current.openModal();
  }, [onClick]);

  return (
    <>
      <button type="button" onClick={openModal} className={className}>
        {children}
      </button>

      <ConfirmationModal action={deletePost} dialogRef={ref}>
        Are you sure you want to delete this post?
      </ConfirmationModal>

      {loading && <LoadingSpinner />}
      {error && <AlertModal message={error.message} />}
    </>
  );
});
