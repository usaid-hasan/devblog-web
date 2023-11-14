import { Link, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function PostContent({ id, content }) {
  const location = useLocation();
  const isPostPage = location.pathname.startsWith('/post/');

  if (isPostPage) {
    return (
      <ReactMarkdown className="prose prose-zinc prose-orange col-span-full max-w-none break-words dark:prose-invert prose-code:font-semibold prose-img:max-h-64 prose-img:w-full [&_*]:transition-colors">
        {content}
      </ReactMarkdown>
    );
  }

  return (
    <div className="relative col-span-full">
      <Link to={`/post/${id}`} className="absolute inset-0 h-full w-full rounded">
        <span className="sr-only">permalink</span>
      </Link>
      <ReactMarkdown allowedElements={['img']} unwrapDisallowed className="line-clamp-2 whitespace-pre-wrap text-base leading-7 text-zinc-600 transition-colors dark:text-zinc-200" components={{ img: () => '[Image]' }}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
