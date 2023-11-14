import { InMemoryCache } from '@apollo/client';

export default new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        post: {
          read: (_, { args, toReference }) => toReference(`Post:${args.id}`),
        },
        postFeed: {
          keyArgs: false,
          read: (existing) => existing && {
            results: existing.results,
            cursor: existing.cursor,
            hasNextPage: existing.hasNextPage,
            posts: existing.posts,
          },
          merge: (existing, incoming) => ({
            results: incoming.results,
            cursor: incoming.cursor,
            hasNextPage: incoming.hasNextPage,
            posts: existing ? existing.posts.concat(incoming.posts) : incoming.posts,
          }),
        },
      },
    },
  },
});
