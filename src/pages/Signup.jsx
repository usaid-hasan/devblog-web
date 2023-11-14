import { usePageTitle } from '@/hooks';
import { useSignup } from '@/api';
import { AlertModal, FormHeader, LoadingSpinner, PageLogo, UserForm } from '@/components';

export default function Signup() {
  usePageTitle('Create your account');

  const { signUp, loading, error } = useSignup();

  return (
    <>
      <PageLogo>
        <FormHeader formType="signup" />
        <UserForm formType="signup" formSubmit={signUp} />
      </PageLogo>
      {loading && <LoadingSpinner />}
      {error && <AlertModal message={error.message} />}
    </>
  );
}
