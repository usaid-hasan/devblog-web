import { Outlet, useParams } from 'react-router-dom';
import { getUser } from '@/client';
import { usePageTitle } from '@/hooks';
import { useCreatePost, useGetPost, useUpdatePost } from '@/api';
import { AlertModal, LoadingSpinner, Alert, PageHeader, PostForm } from '@/components';

export default function PostSubmit() {
  return <Outlet />;
}

export function CreatePost() {
  usePageTitle('Create your post');

  const { createPost, loading, error } = useCreatePost();

  return (
    <>
      <PageHeader heading="Create your post" />
      <PostForm formType="create" formSubmit={createPost} />
      {loading && <LoadingSpinner />}
      {error && <AlertModal message={error.message} />}
    </>
  );
}

export function EditPost() {
  usePageTitle('Edit your post');

  const { id } = useParams();

  const { data, loading: loadingPost, error: errorPost } = useGetPost(id);
  const { updatePost, loading: loadingUpdate, error: errorUpdate } = useUpdatePost(id);

  if (loadingPost) return <LoadingSpinner />;
  if (errorPost) return <Alert message={errorPost.message} />;

  const user = getUser();
  if (user.id !== data.post.author.id) return <Alert message="You do not have permission to edit this post." />;

  return (
    <>
      <PageHeader heading="Edit your post" />
      <PostForm formType="edit" formSubmit={updatePost} content={data.post.content} />
      {loadingUpdate && <LoadingSpinner />}
      {errorUpdate && <AlertModal message={errorUpdate.message} />}
    </>
  );
}
