import { memo } from 'react';
import { Link } from 'react-router-dom';

export default memo(function FormHeader({ formType }) {
  let heading, text;

  switch (formType) {
    case 'signin':
      heading = 'Sign in to your account';
      text = "Don't have an account?";
      break;
    case 'signup':
      heading = 'Create your account now';
      text = 'Already have an account?';
      break;
    case 'forgot':
      heading = 'Forgot your password';
      text = "Tell us the email for your account, and we'll send you an email with a link to reset your password.";
      break;
    case 'reset':
      heading = 'Reset your password';
      text = 'Enter the new password for your account.';
      break;
    default:
  }

  return (
    <header className="mb-8 text-center">
      <h1 className="mb-2 text-2xl font-extrabold tracking-tight">
        {heading}
      </h1>
      <h2 className="text-sm font-semibold text-zinc-500 transition-colors dark:text-zinc-400">
        {text}
        {' '}
        {
          (formType === 'signin' || formType === 'signup')
          &&
          <Link to={formType === 'signup' ? '/signin' : '/signup'} className="rounded-sm font-semibold text-orange-600 transition-colors hover:text-orange-700">
            {formType === 'signup' ? 'Sign in now' : 'Sign up now'}
          </Link>
        }
      </h2>
    </header>
  );
});
