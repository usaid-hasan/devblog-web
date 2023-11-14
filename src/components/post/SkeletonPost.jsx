export default function SkeletonPost() {
  return (
    <div className="grid animate-pulse grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-6 rounded-md bg-white p-4 text-neutral-300 transition-colors dark:bg-neutral-700 dark:text-neutral-500">
      <div className="h-10 w-10 overflow-hidden rounded-full bg-current" />
      <div>
        <div className="mb-2 h-[1ex] w-32 rounded bg-current" />
        <div className="h-[1ex] w-24 rounded bg-current" />
      </div>
      <div className="col-span-full h-[1ex] w-full rounded bg-current" />
      <div className="col-span-full h-[1ex] w-full rounded bg-current" />
      <div className="col-span-2 flex h-6 w-16 items-center gap-2 justify-self-start rounded-full bg-current px-4 py-1" />
    </div>
  );
}
