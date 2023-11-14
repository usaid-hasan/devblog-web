import { Layout, ErrorBoundary } from '@/components';
import rootLoader from './loaders';

export default [
  {
    path: '/',
    element: <Layout />,
    errorElement: <Layout ErrorBoundary={ErrorBoundary} />,
    loader: rootLoader,
  },
];
