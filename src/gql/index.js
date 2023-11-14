export {
  CreatePost as CREATE_POST,
  DeletePost as DELETE_POST,
  UpdatePost as UPDATE_POST,
  ToggleLike as TOGGLE_LIKE,
  SignIn as SIGNIN_USER,
  SignUp as SIGNUP_USER,
  SignOut as SIGNOUT_USER,
  ForgotPassword as FORGOT_PASSWORD,
  ResetPassword as RESET_PASSWORD,
  UpdatePassword as UPDATE_PASSWORD,
  UpdateUser as UPDATE_USER,
  DeleteUser as DELETE_USER,
} from './mutation';

export {
  GetPostFeed as GET_POSTFEED,
  GetPost as GET_POST,
  GetMe as GET_ME,
  GetMyPosts as GET_MY_POSTS,
  GetMyLikedPosts as GET_MY_LIKED_POSTS,
} from './query';
