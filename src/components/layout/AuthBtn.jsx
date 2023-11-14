import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function UserAuthBtn() {
  return (
    <Link to="/signin" className="btn flex items-center gap-2 px-4 py-2">
      <ArrowRightOnRectangleIcon className="h-6 w-6" />
      Login
    </Link>
  );
}
