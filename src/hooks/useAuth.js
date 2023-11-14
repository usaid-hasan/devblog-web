import { useReactiveVar } from '@apollo/client';
import { getUser } from '@/client';

export default function useAuth() {
  return useReactiveVar(getUser);
}
