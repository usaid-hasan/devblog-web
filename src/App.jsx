import { ApolloProvider } from '@apollo/client';
import { RouterProvider } from 'react-router-dom';
import { LoadingSpinner } from '@/components';

export default function App({ client, router }) {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
    </ApolloProvider>
  );
}
