import { HttpResponse, delay, graphql } from 'msw';
import { graphql as execute } from 'graphql';
import schema from './mockSchema';

export default [
  graphql.operation(async ({ cookies, operationName, query, variables }) => {
    if ((/GetM|Update|Delete|Create|Like/).test(operationName)) {
      if (!document.cookie || !cookies.jwt) {
        return HttpResponse.json({ errors: [{ message: 'You need to be signed in to access this.' }] });
      }
    }

    const res = await execute({ schema, source: query, variableValues: variables });
    const resOptions = {};

    if ((/Sign|ResetP|DeleteU/).test(operationName) && res.data) {
      if (operationName === 'DeleteUser' || operationName === 'SignOut') {
        resOptions.headers = {
          'Set-Cookie': 'jwt=; SameSite=None; Secure; Max-Age=0',
        };
      } else {
        resOptions.headers = {
          'Set-Cookie': `jwt=ey1234567890; SameSite=None; Secure; ${variables.rememberme ? 'Max-Age=604800' : ''}`,
        };
      }
    }

    await delay();

    return HttpResponse.json(res, resOptions);
  }),
];
