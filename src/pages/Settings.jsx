import { useCallback, useRef } from 'react';
import { AtSymbolIcon, KeyIcon, TrashIcon } from '@heroicons/react/20/solid';
import { usePageTitle } from '@/hooks';
import { useUpdateUser, useUpdatePassword, useDeleteUser } from '@/api';
import { AlertModal, FormHeader, Dialog, PageHeader, LoadingSpinner, UserForm } from '@/components';

export default function Settings() {
  usePageTitle('Change your account settings');

  return (
    <>
      <PageHeader heading="Account settings" />
      <div className="mb-12 w-full space-y-8 px-2">
        <SettingItem
          Icon={AtSymbolIcon}
          heading="Update email address"
          text="Email account to recover your password."
          useHook={useUpdateUser}
          mutation="updateUser"
          formType="email"
          successMsg="Your email is updated successfully"
        />
        <SettingItem
          Icon={KeyIcon}
          heading="Update password"
          text="Please provide a strong password."
          useHook={useUpdatePassword}
          mutation="updatePassword"
          formType="password"
          successMsg="Your password is updated successfully"
        />
        <SettingItem
          Icon={TrashIcon}
          heading="Delete account"
          text="This is permanent. Once you have deleted your account it cannot be recovered."
          useHook={useDeleteUser}
          mutation="deleteUser"
          formType="delete"
          successMsg="Your account has been permanentlty removed"
          btnText="Delete"
        />
      </div>
    </>
  );
}

function SettingItem({ Icon, heading, text, btnText, useHook, mutation, formType, successMsg }) {
  const ref = useRef();

  const { [mutation]: formSubmit, data, loading, error } = useHook();

  const handleModal = useCallback(() => { ref.current.openModal(); }, []);

  return (
    <section className="grid grid-cols-[auto_1fr_auto] items-start gap-2">
      <Icon className="h-6 w-6" />

      <header className="flex flex-col gap-1">
        <h2 className="font-bold tracking-wide">
          {heading}
        </h2>
        <p className="text-sm text-zinc-500 transition-colors dark:text-zinc-400">
          {text}
        </p>
      </header>

      <button type="button" onClick={handleModal} className="highlight self-center rounded-full border border-gray-300 px-4 py-2 text-sm dark:border-zinc-500">
        {btnText ?? 'Change'}
      </button>

      <Dialog ref={ref} open={false} className="w-full max-w-[min(theme('maxWidth.md'),90vw)] animate-slidein overflow-hidden rounded-md border bg-white text-zinc-700 shadow-xl transition-colors backdrop:bg-gradient-to-b backdrop:from-white/40 dark:border-zinc-800 dark:bg-neutral-800 dark:text-zinc-100 dark:backdrop:from-white/20">
        <div className="w-full max-w-md p-6">
          <Icon className="mx-auto mb-4 h-12 w-12 text-orange-500" />
          <FormHeader formType={formType} />
          <UserForm formType={formType} formSubmit={formSubmit} />
        </div>
      </Dialog>

      {loading && <LoadingSpinner />}
      {error && <AlertModal message={error.message} />}
      {data && <AlertModal message={successMsg} type="info" />}
    </section>
  );
}
