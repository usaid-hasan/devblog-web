import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { getUser } from '@/client';
import { SIGNIN_USER } from '@/gql';

export default function useSignin() {
  const navigate = useNavigate();
  const redirectTo = window.location?.state || '/';

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onError: (err) => { if (import.meta.env.DEV) console.error(err.message); },
    onCompleted: (data) => {
      getUser({ ...data.signIn });
      navigate(redirectTo, { replace: true });
      if (window.location?.state) delete window.location.state;
    },
  });

  return { signIn, loading, error };
}
