import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks';
import Form from './Form';
import InputField from './InputField';

export default memo(function UserForm({ formType, formSubmit }) {
  const user = useAuth();
  let inputFields, btnText;

  switch (formType) {
    case 'signin':
      btnText = 'Sign in';
      inputFields = (
        <>
          <InputField type="username" placeholder="john_doe" minLength={3} maxLength={20} pattern="^(?![_])(?!.*[_]{2})\w+(?<![_])$" />
          <InputField type="password" autoComplete="current-password" placeholder="••••••••" minLength={8} />
        </>
      );
      break;
    case 'signup':
      btnText = 'Sign up';
      inputFields = (
        <>
          <InputField type="email" placeholder="example@abc.com" />
          <InputField type="username" placeholder="john_doe" minLength={3} maxLength={20} pattern="^(?![_])(?!.*[_]{2})\w+(?<![_])$" />
          <InputField type="password" autoComplete="new-password" placeholder="••••••••" minLength={8} />
        </>
      );
      break;
    case 'forgot':
      btnText = 'Send email';
      inputFields = <InputField type="email" placeholder="example@abc.com" />;
      break;
    case 'reset':
      btnText = 'Reset Password';
      inputFields = <InputField type="password" autoComplete="new-password" placeholder="••••••••" minLength={8} />;
      break;
    case 'email':
      btnText = 'Change email';
      inputFields = <InputField type="email" placeholder={user.email} />;
      break;
    case 'password':
      btnText = 'Change password';
      inputFields = (
        <>
          <InputField type="password" autoComplete="current-password" name="currentPassword" placeholder="••••••••" minLength={8} label="Current Password" />
          <InputField type="password" autoComplete="new-password" name="newPassword" placeholder="••••••••" minLength={8} label="New Password" />
        </>
      );
      break;
    case 'delete':
      btnText = 'Yes I want to delete my account';
      inputFields = <InputField type="password" autoComplete="current-password" placeholder="••••••••" minLength={8} />;
      break;
    default:
  }

  return (
    <Form formSubmit={formSubmit} name={formType}>
      <div className="mb-8 divide-y divide-zinc-100 rounded-md shadow-md dark:divide-neutral-600 [&>*:first-child>input]:rounded-t-md [&>*:last-child>input]:rounded-b-md [&>*]:transition-colors">
        {inputFields}
      </div>

      {
        (formType === 'signin' || formType === 'signup')
        &&
        <div className="mb-4 flex justify-between text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 sm:tracking-wider [&>*]:w-max [&>*]:transition-colors">
          <label>
            <input type="checkbox" name="rememberme" className="accent-orange-600 focus-visible:outline-offset-2 dark:accent-orange-500" />
            &emsp;Remember me
          </label>

          <Link to="/forgot-password" className="rounded-sm text-orange-600 hover:text-orange-700">
            Forgot your password?
          </Link>
        </div>
      }

      <button type="submit" className="btn relative w-full p-2">
        {btnText}
      </button>
    </Form>
  );
});
