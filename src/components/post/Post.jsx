import { memo } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/hooks';
import { formatTime, getAvatarUrl } from '@/utils/helpers';
import LikeBtn from './LikeBtn';
import PostContent from './PostContent';

export default memo(function Post({ post, lastElRef }) {
  const user = useAuth();

  return (
    <article ref={lastElRef} className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-6 rounded-md border bg-white p-4 shadow-md transition-colors dark:border-zinc-800 dark:bg-neutral-700">
      <div className="h-10 w-10 overflow-hidden rounded-full">
        {
          post.author.username === '[deleted]' ?
            <img src={getAvatarUrl(null)} alt="Blank avatar of deleted user" width="40" height="40" />
            :
            <img src={getAvatarUrl(post.author.avatar)} alt={`Avatar of ${post.author.username}`} width="40" height="40" />
        }
      </div>

      <header>
        <address className="font-semibold not-italic tracking-wide">
          {post.author.username}
        </address>
        <time dateTime={post.createdAt} className="block text-xs text-zinc-500 transition-colors dark:text-zinc-300">
          {formatTime(post.createdAt)}
        </time>
      </header>

      <PostContent id={post.id} content={post.content} />

      {
        user ?
          <LikeBtn id={post.id} likesCount={post.likesCount} />
          :
          <button type="button" aria-label="toggle-like" disabled className="col-span-2 flex items-center gap-2 justify-self-start rounded-full bg-zinc-100 px-4 py-1 transition-colors dark:bg-neutral-600">
            <StarIcon className="h-5 w-5 text-orange-500" />
            <span className="text-xs font-bold">{post.likesCount}</span>
          </button>
      }
    </article>
  );
});
