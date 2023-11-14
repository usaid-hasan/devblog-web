import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function Alert({ message, type, modal }) {
  let icon;

  switch (type) {
    case 'warn':
      icon = <ExclamationTriangleIcon className="h-8 w-8 shrink-0 text-yellow-500" />;
      break;
    case 'info':
      icon = <InformationCircleIcon className="h-8 w-8 shrink-0 text-blue-500" />;
      break;
    default:
      icon = <ExclamationTriangleIcon className="h-8 w-8 shrink-0 text-red-500" />;
  }

  return (
    <div className={`flex items-center justify-center text-center ${modal ? 'gap-4 p-2 lg:gap-6 lg:p-4' : 'gap-6 rounded-md border bg-white p-6 shadow-md transition-colors dark:border-zinc-800 dark:bg-neutral-700'}`}>
      {icon}
      <p><strong className="font-semibold">{message}</strong></p>
    </div>
  );
}
