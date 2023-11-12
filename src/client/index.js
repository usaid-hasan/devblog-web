import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  credentials: 'include',
  cache: new InMemoryCache(),
  connectToDevTools: import.meta.env.DEV,
});

export default client;
