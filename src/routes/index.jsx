import { Layout, ErrorBoundary } from '@/components';
import Home from '@/pages/Home';
import rootLoader from './loaders';

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
    ],
  },
];
