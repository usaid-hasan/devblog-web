import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { getUser } from '@/client';
import { SIGNUP_USER } from '@/gql';

export default function useSignup() {
  const navigate = useNavigate();

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onError: (err) => { if (import.meta.env.DEV) console.error(err.message); },
    onCompleted: (data) => {
      getUser({ ...data.signUp });
      navigate('/', { replace: true });
    },
  });

  return { signUp, loading, error };
}
