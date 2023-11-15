import { useQuery } from '@apollo/client';
import { GET_MY_LIKED_POSTS } from '@/gql';

export default function useGetMyLikedPosts() {
  return useQuery(GET_MY_LIKED_POSTS);
}
