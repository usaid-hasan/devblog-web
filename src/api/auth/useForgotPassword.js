import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD } from '@/gql';

export default function useForgotPassword() {
  const [forgotPassword, { loading, error, data }] = useMutation(FORGOT_PASSWORD, {
    onError: (err) => { if (import.meta.env.DEV) console.error(err.message); },
    onCompleted: (d) => { console.info(d); },
  });

  return { forgotPassword, loading, error, data };
}
