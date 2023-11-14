/* eslint-disable no-magic-numbers */
import { buildClientSchema, GraphQLError } from 'graphql';
import { DateTimeISOResolver, ObjectIDResolver } from 'graphql-scalars';
import { addMocksToSchema, createMockStore } from '@graphql-tools/mock';
import { faker } from '@faker-js/faker';
import introspection from './introspection';

const schema = buildClientSchema(introspection);

const mocks = {
  ObjectID: faker.database.mongodbObjectId,
  DateTimeISO: () => faker.date.recent().toISOString(),
  Post: () => ({
    content: faker.lorem.paragraph,
    likesCount: () => faker.number.int(50),
  }),
  User: () => ({
    username: faker.internet.userName,
    avatar: () => faker.string.hexadecimal({ length: 32, casing: 'upper', prefix: '' }),
  }),
  Me: () => ({
    avatar: () => faker.string.hexadecimal({ length: 32, casing: 'upper', prefix: '' }),
    likedPosts: [...new Array(faker.number.int(15))],
  }),
  PostFeed: () => ({
    results: 10,
    hasNextPage: true,
    posts: [...new Array(10)],
  }),
  Query: () => ({
    myPosts: [...new Array(5)],
  }),
};

const store = createMockStore({ schema, mocks });

const resolvers = (s) => {
  let myPassword = 'test1234',
      myUsername = 'test_user',
      myEmail = 'test_email@abc.com';
  const myResetToken = '1234567890';

  let myPosts = s.get('Query', 'ROOT', 'myPosts');

  const meRef = s.get('Me', { username: myUsername, email: myEmail });
  const meAsUser = s.get('User', {
    id: s.get(meRef, 'id'),
    username: s.get(meRef, 'username'),
    avatar: s.get(meRef, 'avatar'),
  });

  return {
    ObjectID: ObjectIDResolver,
    DateTimeISO: DateTimeISOResolver,
    Query: {
      post: (_, { id }) => {
        if (!s.has('Post', id)) throw new GraphQLError('No such post exists.');
        return s.get('Post', id);
      },
      postFeed: () => {
        const feedRef = s.get('PostFeed');
        s.set(feedRef, 'cursor', s.get(feedRef, 'posts').at(-1).$ref.key);
        return feedRef;
      },
      me: () => meRef,
      myPosts: () => {
        myPosts.forEach((post) => { s.set(post, 'author', meAsUser); });
        return myPosts;
      },
      myLikedPosts: () => s.get(meRef, 'likedPosts').map((id) => s.get('Post', id)),
    },
    Mutation: {
      createPost: (_, { content }) => {
        const post = s.get('Post', {
          content,
          likesCount: 0,
          author: meAsUser,
          createdAt: new Date().toISOString(),
        });
        myPosts.push(post);
        return post;
      },
      updatePost: (_, { id, content }) => {
        s.set('Post', id, { content });
        return s.get('Post', id);
      },
      deletePost: (_, { id }) => id,
      toggleLike: (_, { id }) => {
        const myLikedPostsRef = s.get(meRef, 'likedPosts');
        const postRef = s.get('Post', id);
        const count = s.get(postRef, 'likesCount');

        const liked = myLikedPostsRef.some((el) => id === el);
        const likesCount = liked ? count - 1 : count + 1;
        const likedPosts = liked ? myLikedPostsRef.filter((el) => el !== id) : myLikedPostsRef.concat(id);

        s.set(postRef, { likesCount });
        s.set(meRef, 'likedPosts', likedPosts);
        return { likesCount, liked: !liked };
      },
      signIn: (_, { username, password }) => {
        if (username === myUsername && password === myPassword) return meRef;
        throw new GraphQLError('Incorrect username or password.');
      },
      signUp: (_, { username, email, password }) => {
        // eslint-disable-next-line no-unused-expressions, no-sequences
        myPassword = password, myUsername = username, myEmail = email, myPosts = [];
        s.set(meRef, { username, email, likedPosts: [] });
        return meRef;
      },
      signOut: () => true,
      updateUser: (_, { email }) => {
        myEmail = email;
        s.set(meRef, { email });
        return meRef;
      },
      deleteUser: (_, { password }) => {
        if (password !== myPassword) throw new GraphQLError('Incorrect password.');
        myUsername = '[deleted]';
        s.set(meRef, { username: myUsername });
        return s.get(meRef, 'id');
      },
      updatePassword: (_, { currentPassword, newPassword }) => {
        if (currentPassword !== myPassword) throw new GraphQLError('Incorrect password.');
        myPassword = newPassword;
        return meRef;
      },
      forgotPassword: () => 'Your reset token is sent to email. Token is valid for only (10) minutes.',
      resetPassword: (_, { resetToken, password }) => {
        if (myUsername === '[deleted]' || resetToken !== myResetToken) throw new GraphQLError('Reset token is invalid or has expired.');
        myPassword = password;
        return meRef;
      },
    },
  };
};

export default addMocksToSchema({ schema, store, resolvers });
