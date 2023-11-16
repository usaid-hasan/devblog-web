import { useMutation } from '@apollo/client';
import { getUser } from '@/client';
import { UPDATE_USER } from '@/gql';

export default function useUpdateUser() {
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER, {
    onError: (err) => { if (import.meta.env.DEV) console.error(err.message); },
    onCompleted: (d) => { getUser({ ...d.updateUser }); },
  });

  return { updateUser, data, loading, error };
}
