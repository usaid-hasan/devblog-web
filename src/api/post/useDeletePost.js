import { useMutation } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser } from '@/client';
import { DELETE_POST } from '@/gql';

export default function useDeletePost(id) {
  const user = getUser();

  const navigate = useNavigate();
  const location = useLocation();

  const [deletePost, { loading, error }] = useMutation(DELETE_POST, {
    variables: { id },
    onError: (err) => { if (import.meta.env.DEV) console.error(err.message); },
    onCompleted: () => { if (location.pathname.startsWith('/post/')) navigate('/', { replace: true }); },
    update: (cache) => {
      cache.evict({ id: `Post:${id}` });
      cache.modify({
        fields: {
          myPosts: (refs, { canRead }) => refs.filter(canRead),
          myLikedPosts: (refs, { canRead }) => refs.filter(canRead),
        },
      });
      cache.modify({
        id: `Me:${user.id}`,
        fields: {
          likedPosts: (list, { canRead, toReference }) => list.filter((i) => canRead(toReference(`Post:${i}`))),
        },
      });
    },
  });

  return { deletePost, loading, error };
}
