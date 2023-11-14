import { ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useSignout } from '@/api';
import { useAuth } from '@/hooks';
import LoadingSpinner from './LoadingSpinner';
import AlertModal from '../modal/AlertModal';

export default function UserAuthBtn() {
  const user = useAuth();

  const { signOut, loading, error } = useSignout();

  return (
    <>
      {
        user ?
          <button type="button" onClick={signOut} className="btn flex items-center gap-2 px-4 py-2">
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            Logout
          </button>
          :
          <Link to="/signin" className="btn flex items-center gap-2 px-4 py-2">
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
            Login
          </Link>
      }
      {loading && <LoadingSpinner />}
      {error && <AlertModal message={error.message} />}
    </>
  );
}
