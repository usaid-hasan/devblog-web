import { useQuery } from '@apollo/client';
import { GET_MY_POSTS } from '@/gql';

export default function useGetMyPosts() {
  return useQuery(GET_MY_POSTS);
}
