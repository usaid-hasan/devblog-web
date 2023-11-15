export default function PageHeader({ heading }) {
  return (
    <h1 className="mb-12 block border-b text-xl font-bold uppercase transition-colors dark:border-zinc-500">
      {heading}
    </h1>
  );
}
