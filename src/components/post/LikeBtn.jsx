import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useToggleLike } from '@/api';
import AlertModal from '../modal/AlertModal';

export default function LikeBtn({ id, likesCount }) {
  const { count, liked, toggleFavourite, error, loading } = useToggleLike(id, likesCount);

  return (
    <>
      <button type="button" aria-label="toggle-like" onClick={toggleFavourite} className={`col-span-2 flex items-center gap-2 justify-self-start rounded-full bg-orange-400/20 px-4 py-1 shadow transition ease-linear active:bg-orange-600/20 disabled:bg-orange-400/20 mouse:hover:bg-orange-600/20 mouse:hover:shadow-none disabled:mouse:hover:bg-orange-400/20 ${loading ? 'cursor-progress' : ''}`} disabled={loading}>
        {
          liked ?
            <StarIconSolid className="h-5 w-5 text-orange-500" />
            :
            <StarIconOutline className="h-5 w-5 text-orange-500" />
        }
        <span className="text-xs font-semibold">{count}</span>
      </button>
      {error && <AlertModal message={error.message} />}
    </>
  );
}
