import { useEffect } from 'react';
import { Outlet, NavLink, useHref, useNavigate } from 'react-router-dom';
import { RectangleStackIcon, StarIcon } from '@heroicons/react/20/solid';
import { useAuth, usePageTitle } from '@/hooks';
import { useGetMyLikedPosts, useGetMyPosts } from '@/api';
import { Alert, LoadingSpinner, Post } from '@/components';
import { getAvatarUrl } from '@/utils/helpers';

const tabs = [
  { to: 'posts', label: 'Posts', Icon: RectangleStackIcon },
  { to: 'likedPosts', label: 'Likes', Icon: StarIcon },
];

export default function Profile() {
  const href = useHref();
  const navigate = useNavigate();

  useEffect(() => { if (href.endsWith('profile')) navigate('posts', { replace: true }); });

  const user = useAuth();
  if (!user) return null;

  return (
    <>
      <figure className="mb-12 flex items-center gap-12">
        <div className="basis-1/3">
          <img className="ml-auto h-24 w-24 overflow-hidden rounded-full shadow-md" src={getAvatarUrl(user.avatar, '200')} alt={`Avatar of ${user.username}`} width="96" height="96" />
        </div>

        <figcaption className="space-y-1 tracking-wide">
          <p className="text-2xl font-bold">{user.username}</p>
          <p className="font-semibold text-zinc-500 transition-colors dark:text-zinc-400">{user.email}</p>
        </figcaption>
      </figure>

      <menu className="mb-4 flex w-full gap-2 rounded-md border bg-white p-0.5 shadow-md transition-colors dark:border-zinc-800 dark:bg-neutral-700 lg:p-1">
        {tabs.map((tab) => (
          <li className="flex-1" key={tab.to}>
            <NavLink to={tab.to} className="highlight relative flex w-full items-center justify-center gap-2 rounded-md p-2 font-bold focus-visible:outline-offset-2">
              <tab.Icon className="h-5 w-5" />
              {tab.label}
            </NavLink>
          </li>
        ))}
      </menu>

      <Outlet />
    </>
  );
}

export function MyPosts() {
  usePageTitle('Your posts');

  const { data, error, loading } = useGetMyPosts();

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert message={error.message} />;

  const { myPosts } = data;
  if (!myPosts?.length) return <Alert message="You do not have any posts yet!" type="info" />;

  return (
    <div className="space-y-2">
      {myPosts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
}

export function MyLikedPosts() {
  usePageTitle('Your likes');

  const { data, error, loading } = useGetMyLikedPosts();

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert message={error.message} />;

  const { myLikedPosts } = data;
  if (!myLikedPosts?.length) return <Alert message="You do not have any likes yet!" type="info" />;

  return (
    <div className="space-y-2">
      {myLikedPosts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
}
