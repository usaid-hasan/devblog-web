import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { DELETE_USER } from '@/gql';

const TIME_OUT = 2500;

export default function useDeleteUser() {
  const navigate = useNavigate();

  const [deleteUser, { data, loading, error, client }] = useMutation(DELETE_USER, {
    onError: (err) => { if (import.meta.env.DEV) console.error(err.message); },
    onCompleted: async () => {
      await client.clearStore();
      setTimeout(() => { navigate('/', { replace: true }); }, TIME_OUT);
    },
  });

  return { deleteUser, data, loading, error };
}
