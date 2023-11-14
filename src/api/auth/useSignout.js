import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { SIGNOUT_USER } from '@/gql';

export default function useSignout() {
  const navigate = useNavigate();

  const [signOut, { loading, error, client }] = useMutation(SIGNOUT_USER, {
    onError: (err) => { if (import.meta.env.DEV) console.error(err.message); },
    onCompleted: async () => {
      await client.clearStore();
      navigate('/', { replace: true });
    },
  });

  return { signOut, loading, error };
}
