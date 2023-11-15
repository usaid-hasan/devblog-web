import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_POST } from '@/gql';

export default function useCreatePost() {
  const navigate = useNavigate();

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    onError: (err) => { if (import.meta.env.DEV) console.error(err.message); },
    onCompleted: (data) => navigate(`/post/${data.createPost.id}`, { replace: true }),
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          myPosts: (value, { toReference }) => [...[toReference(`Post:${data.createPost.id}`)], ...value],
          postFeed: (value, { toReference }) => ({
            results: value.results,
            cursor: value.cursor,
            hasNextPage: value.hasNextPage,
            posts: [...[toReference(`Post:${data.createPost.id}`)], ...value.posts],
          }),
        },
      });
    },
  });

  return { createPost, loading, error };
}
