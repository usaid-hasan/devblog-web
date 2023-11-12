import { ApolloProvider } from '@apollo/client';
import { RouterProvider } from 'react-router-dom';

export default function App({ client, router }) {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}
