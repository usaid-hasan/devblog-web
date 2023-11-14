import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export default forwardRef(function Form({ name, formSubmit, children }, ref) {
  const formRef = useRef();

  useImperativeHandle(ref, () => ({
    resetForm: () => { for (const input of formRef.current.elements) { input.value = ''; } },
  }), []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const variables = {};
    formData.forEach((value, key) => { variables[key] = value; });
    formSubmit({ variables });
  }, [formSubmit]);

  return (
    <form ref={formRef} onSubmit={handleSubmit} name={name}>
      {children}
    </form>
  );
});
