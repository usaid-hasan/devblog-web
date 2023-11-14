import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { getUser } from '@/client';
import { RESET_PASSWORD } from '@/gql';

export default function useResetPassword(resetToken) {
  const navigate = useNavigate();

  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD, {
    variables: { resetToken },
    onError: (err) => { if (import.meta.env.DEV) console.error(err.message); },
    onCompleted: (data) => {
      getUser({ ...data.resetPassword });
      navigate('/', { replace: true });
    },
  });

  return { resetPassword, loading, error };
}
