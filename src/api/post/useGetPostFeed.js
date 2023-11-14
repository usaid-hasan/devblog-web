import { useQuery } from '@apollo/client';
import { GET_POSTFEED } from '@/gql';

export default function useGetPostFeed() {
  return useQuery(GET_POSTFEED, { notifyOnNetworkStatusChange: true });
}
