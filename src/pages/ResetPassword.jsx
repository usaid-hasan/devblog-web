import { useParams } from 'react-router-dom';
import { usePageTitle } from '@/hooks';
import { useResetPassword } from '@/api';
import { AlertModal, FormHeader, LoadingSpinner, PageLogo, UserForm } from '@/components';

export default function ResetPassword() {
  usePageTitle('Reset your password');

  const { token } = useParams();

  const { resetPassword, loading, error } = useResetPassword(token);

  return (
    <>
      <PageLogo>
        <FormHeader formType="reset" />
        <UserForm formType="reset" formSubmit={resetPassword} />
      </PageLogo>
      {loading && <LoadingSpinner />}
      {error && <AlertModal message={error.message} />}
    </>
  );
}
