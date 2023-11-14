/* eslint-disable no-param-reassign */
import { from } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client/link/http';

const errorLink = new ErrorLink(({ networkError, graphQLErrors }) => {
  if (networkError) {
    console.error(networkError);
    networkError.message = 'Trouble connecting to server.';
  }
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      if (error.message.includes('Value is not a valid mongodb object id of form')) error.message = 'Please provide a valid id.';
    });
  }
});

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL,
  credentials: 'include',
});

export default from([errorLink, httpLink]);
