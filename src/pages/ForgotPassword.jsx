import { usePageTitle } from '@/hooks';
import { useForgotPassword } from '@/api';
import { AlertModal, FormHeader, LoadingSpinner, PageLogo, UserForm } from '@/components';

export default function ForgotPassword() {
  usePageTitle('Forgot your password');

  const { forgotPassword, loading, error, data } = useForgotPassword();

  return (
    <>
      <PageLogo>
        <FormHeader formType="forgot" />
        <UserForm formType="forgot" formSubmit={forgotPassword} />
      </PageLogo>
      {loading && <LoadingSpinner />}
      {data && <AlertModal message={data.forgotPassword} type="info" />}
      {error && <AlertModal message={error.message} />}
    </>
  );
}
