import { useParams } from 'react-router-dom';
import { usePageTitle } from '@/hooks';
import { useGetPost } from '@/api';
import { Alert, Post, LoadingSpinner } from '@/components';

export default function PostView() {
  usePageTitle('Post');

  const { id } = useParams();

  const { data, loading, error } = useGetPost(id);

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert message={error.message} />;

  return <Post post={data.post} />;
}
