import { NetworkStatus } from '@apollo/client';
import { useFeed } from '@/hooks';
import Alert from '../layout/Alert';
import Post from './Post';
import SkeletonPost from './SkeletonPost';

export default function PostFeed({ data, fetchMore, networkStatus }) {
  const { lastItemRef, fetchMoreError } = useFeed(data.postFeed, 'postFeed', fetchMore, networkStatus);

  return (
    <div className="space-y-2" role="feed">
      {
        data.postFeed.posts.map((post, i, posts) => (
          posts[i + 1] ?
            <Post key={post.id} post={post} />
            :
            <Post lastElRef={lastItemRef} key={post.id} post={post} />
        ))
      }
      {networkStatus === NetworkStatus.fetchMore && <SkeletonPost />}
      {fetchMoreError && <Alert message={fetchMoreError.message} />}
    </div>
  );
}
