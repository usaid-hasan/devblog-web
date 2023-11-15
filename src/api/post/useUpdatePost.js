import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { UPDATE_POST } from '@/gql';

export default function useUpdatePost(id) {
  const navigate = useNavigate();

  const [updatePost, { loading, error }] = useMutation(UPDATE_POST, {
    variables: { id },
    onError: (err) => { if (import.meta.env.DEV) console.error(err.message); },
    onCompleted: (data) => navigate(`/post/${data.updatePost.id}`, { replace: true }),
  });

  return { updatePost, loading, error };
}
