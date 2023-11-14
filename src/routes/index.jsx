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
    ],
  },
];
