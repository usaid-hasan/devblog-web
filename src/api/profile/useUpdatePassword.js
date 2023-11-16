import { useMutation } from '@apollo/client';
import { getUser } from '@/client';
import { UPDATE_PASSWORD } from '@/gql';

export default function useUpdatePassword() {
  const [updatePassword, { data, loading, error }] = useMutation(UPDATE_PASSWORD, {
    onError: (err) => { if (import.meta.env.DEV) console.error(err.message); },
    onCompleted: (d) => { getUser({ ...d.updatePassword }); },
  });

  return { updatePassword, data, loading, error };
}
