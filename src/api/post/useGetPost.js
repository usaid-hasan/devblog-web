import { useQuery } from '@apollo/client';
import { GET_POST } from '@/gql';

export default function useGetPost(id) {
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { id },
    onError: (err) => { if (import.meta.env.DEV) console.error(err.message); },
  });

  return { data, loading, error };
}
