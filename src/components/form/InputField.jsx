import { useId } from 'react';
import { useInputField } from '@/hooks';

export default function InputField({ name, type, autoComplete, minLength, maxLength, pattern, placeholder, label }) {
  const id = useId();

  const {
    refs: { errorMsgRef },
    props: { onInput, onBlur, onInvalid },
  } = useInputField(type);

  return (
    <div className="grid grid-cols-[max-content_1fr] grid-rows-[theme(spacing.8)_1fr] items-center gap-x-2">
      <input
        required
        id={`${id}-input-${type}`}
        name={name || type}
        type={type === 'username' ? 'text' : type}
        autoComplete={autoComplete || type}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        placeholder={placeholder}
        aria-errormessage={`${id}-error-msg`}
        className="peer relative col-span-full row-span-full block w-full bg-white px-4 pb-2 pt-8 font-semibold leading-8 tracking-wide transition-colors placeholder:text-neutral-400 focus-visible:z-10 dark:bg-neutral-700 dark:placeholder:text-zinc-500"
        {...{ onBlur, onInput, onInvalid }}
      />
      <label htmlFor={`${id}-input-${type}`} className="z-20 col-start-1 row-start-1 ps-4 text-left text-xs font-bold uppercase tracking-tight text-zinc-500 transition-colors peer-autofill:text-neutral-500 dark:text-zinc-300 sm:tracking-wider">{label || type}</label>
      <span id={`${id}-error-msg`} role="alert" ref={errorMsgRef} className="z-20 col-start-2 row-start-1 hidden pe-4 text-right text-xs font-bold uppercase tracking-tight text-red-600 transition-colors dark:text-red-400 sm:tracking-wider" />
    </div>
  );
}
