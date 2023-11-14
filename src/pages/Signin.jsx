import { usePageTitle } from '@/hooks';
import { useSignin } from '@/api';
import { AlertModal, FormHeader, LoadingSpinner, PageLogo, UserForm } from '@/components';

export default function Signin() {
  usePageTitle('Sign in to your account');

  const { signIn, loading, error } = useSignin();

  return (
    <>
      <PageLogo>
        <FormHeader formType="signin" />
        <UserForm formType="signin" formSubmit={signIn} />
      </PageLogo>
      {loading && <LoadingSpinner />}
      {error && <AlertModal message={error.message} />}
    </>
  );
}
