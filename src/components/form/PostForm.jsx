import { memo, useId, useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Form from './Form';

export default memo(function PostForm({ formType, formSubmit, content }) {
  const [wrap, setWrap] = useState(true);
  const id = useId();

  return (
    <Form formSubmit={formSubmit} name={formType}>
      <div className="mb-4 flex justify-between text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 sm:tracking-wider [&>*]:w-max [&>*]:transition-colors">
        <label htmlFor={`${id}-input-textarea`} className="flex items-center gap-2">
          Post (markdown supported)
        </label>

        <label>
          Wrap text&emsp;
          <input type="checkbox" checked={wrap} onChange={() => setWrap((s) => !s)} className="accent-orange-600 focus-visible:outline-offset-2 dark:accent-orange-500" />
        </label>
      </div>

      <textarea
        required
        id={`${id}-input-textarea`}
        name="content"
        placeholder="What's on your mind?"
        defaultValue={content}
        wrap={wrap ? 'soft' : 'off'}
        rows="10"
        className="mb-8 block w-full rounded-md border bg-white p-4 font-mono shadow-md transition-colors placeholder:text-neutral-400 dark:border-zinc-800 dark:bg-neutral-700"
      />
      <button type="submit" className="btn ml-auto flex items-center gap-2 px-4 py-2">
        <PencilSquareIcon className="h-6 w-6" />
        {formType === 'edit' ? 'Save' : 'Create'}
      </button>
    </Form>
  );
});
