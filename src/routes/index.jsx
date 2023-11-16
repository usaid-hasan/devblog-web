import { Layout, ErrorBoundary } from '@/components';
import Home from '@/pages/Home';
import { authLoader, rootLoader } from './loaders';

export default [
  {
    path: '/',
    element: <Layout />,
    errorElement: <Layout ErrorBoundary={ErrorBoundary} />,
    loader: rootLoader,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'post/:id',
        lazy: async () => ({ Component: (await import('@/pages/PostView')).default }),
      },
      {
        path: 'signin',
        lazy: async () => ({ Component: (await import('@/pages/Signin')).default }),
      },
      {
        path: 'signup',
        lazy: async () => ({ Component: (await import('@/pages/Signup')).default }),
      },
      {
        path: 'forgot-password',
        lazy: async () => ({ Component: (await import('@/pages/ForgotPassword')).default }),
      },
      {
        path: 'reset-password/:token',
        lazy: async () => ({ Component: (await import('@/pages/ResetPassword')).default }),
      },
      {
        path: 'settings',
        loader: authLoader,
        lazy: async () => ({ Component: (await import('@/pages/Settings')).default }),
      },
      {
        path: 'submit',
        loader: authLoader,
        lazy: async () => ({ Component: (await import('@/pages/PostSubmit')).default }),
        children: [
          { index: true, lazy: async () => ({ Component: (await import('@/pages/PostSubmit')).CreatePost }) },
          { path: ':id', lazy: async () => ({ Component: (await import('@/pages/PostSubmit')).EditPost }) },
        ],
      },
      {
        path: 'profile',
        loader: authLoader,
        lazy: async () => ({ Component: (await import('@/pages/Profile')).default }),
        children: [
          { path: 'posts', lazy: async () => ({ Component: (await import('@/pages/Profile')).MyPosts }) },
          { path: 'likedPosts', lazy: async () => ({ Component: (await import('@/pages/Profile')).MyLikedPosts }) },
        ],
      },
    ],
  },
];
