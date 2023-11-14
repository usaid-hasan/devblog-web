import { useCallback, useRef, useState } from 'react';

export default function useInputField(type) {
  const errorMsgRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  if (hasInteracted) errorMsgRef.current.classList.add('peer-invalid:block');

  const handleInput = useCallback((e) => {
    if (!hasInteracted) return;

    if (e.currentTarget.checkValidity()) {
      errorMsgRef.current.textContent = '';
      e.currentTarget.setAttribute('aria-invalid', 'false');
    }
  }, [hasInteracted]);

  const handleBlur = useCallback((e) => {
    if (hasInteracted || e.currentTarget.matches(':autofill, :-webkit-autofill')) return;

    setHasInteracted(true);
    e.currentTarget.checkValidity();
  }, [hasInteracted]);

  const handleInvalid = useCallback((e) => {
    // Called for autofilled values to show msg
    if (!hasInteracted) setHasInteracted(true);

    const { currentTarget: inputEl } = e;
    const { current: labelEl } = errorMsgRef;
    inputEl.setAttribute('aria-invalid', 'true');

    switch (true) {
      case inputEl.validity.valueMissing:
        labelEl.textContent = 'Please fill out this field';
        break;
      case inputEl.validity.typeMismatch:
        labelEl.textContent = `Please enter a valid ${type}`;
        break;
      case inputEl.validity.tooLong:
        labelEl.textContent = `Must be less than ${inputEl.maxLength} characters: ${inputEl.value.length}`;
        break;
      case inputEl.validity.tooShort:
        labelEl.textContent = `Must be atleast ${inputEl.minLength} characters: ${inputEl.value.length}`;
        break;
      case inputEl.validity.patternMismatch:
        if ((/\W/).test(inputEl.value)) labelEl.textContent = 'Only letters, numbers & underscores allowed';
        else if ((/^[_]/).test(inputEl.value)) labelEl.textContent = 'Must not start with underscore';
        else if ((/[_]$/).test(inputEl.value)) labelEl.textContent = 'Must not end with underscore';
        else if ((/.*[_]{2}/).test(inputEl.value)) labelEl.textContent = 'No consecutive underscores';
        break;
      default:
        labelEl.textContent = `Please enter a valid ${type}`;
    }
  }, [type, hasInteracted]);

  return {
    refs: { errorMsgRef },
    props: { onInput: handleInput, onBlur: handleBlur, onInvalid: handleInvalid },
  };
}
