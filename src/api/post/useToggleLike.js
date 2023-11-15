import { useState } from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { getUser } from '@/client';
import { TOGGLE_LIKE } from '@/gql';

export default function useToggleLike(id, likesCount) {
  const user = getUser();

  const [count, setCount] = useState(likesCount);

  const client = useApolloClient();
  const me = client.readFragment({ fragment: gql`fragment LikedPosts on Me { likedPosts }`, id: `Me:${user.id}` });
  const [liked, setLiked] = useState(me.likedPosts.includes(id));

  const [toggleFavourite, { error, loading }] = useMutation(TOGGLE_LIKE, {
    variables: { id },
    onError: (err) => { if (import.meta.env.DEV) console.error(err.message); },
    onCompleted: (data) => {
      setCount(data.toggleLike.likesCount);
      setLiked(data.toggleLike.liked);
      client.cache.modify({
        id: `Post:${id}`,
        broadcast: false,
        fields: {
          likesCount: () => data.toggleLike.likesCount,
        },
      });
      client.cache.modify({
        id: `Me:${user.id}`,
        broadcast: false,
        fields: {
          likedPosts: (list) => (data.toggleLike.liked ? list.concat(id) : list.filter((i) => i !== id)),
        },
      });
    },
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          myLikedPosts: (refs, { readField, toReference }) => (
            data.toggleLike.liked ? refs.concat(toReference(`Post:${id}`)) : refs.filter((i) => readField('id', i) !== id)
          ),
        },
      });
    },
  });

  return { count, liked, toggleFavourite, error, loading };
}
