import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import { GET_ME } from '@/gql';
import link from './link';

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: import.meta.env.DEV,
});

const getUser = makeVar(null);
const userFetched = makeVar(false);

const fetchUser = async () => {
  try {
    const { data } = await client.query({ query: GET_ME, errorPolicy: 'ignore' });
    if (data) getUser({ ...data.me });
  } catch ({ graphQLErrors }) {
    if (graphQLErrors) graphQLErrors.forEach((err) => console.error(err.message));
  } finally {
    userFetched(true);
  }
};

client.onClearStore(() => { getUser(null); });

export default client;
export { getUser, userFetched, fetchUser };
