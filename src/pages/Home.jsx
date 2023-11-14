import { NetworkStatus } from '@apollo/client';
import { usePageTitle } from '@/hooks';
import { useGetPostFeed } from '@/api';
import { Alert, LoadingSpinner, PostFeed } from '@/components';

export default function Home() {
  usePageTitle('Home');

  const { data, error, fetchMore, networkStatus } = useGetPostFeed();

  if (networkStatus === NetworkStatus.loading) return <LoadingSpinner />;
  if (networkStatus === NetworkStatus.error) return <Alert message={error.message} />;

  return <PostFeed data={data} fetchMore={fetchMore} networkStatus={networkStatus} />;
}
