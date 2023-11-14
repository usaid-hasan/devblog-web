import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { getUser } from '@/client';
import { SIGNIN_USER } from '@/gql';

export default function useSignin() {
  const navigate = useNavigate();

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onError: (err) => { if (import.meta.env.DEV) console.error(err.message); },
    onCompleted: (data) => {
      getUser({ ...data.signIn });
      navigate('/', { replace: true });
    },
  });

  return { signIn, loading, error };
}
