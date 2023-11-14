export default function PageLogo({ children }) {
  return (
    <div className="mx-auto w-full max-w-md px-2">
      <img src="/logo.svg" alt={`Logo of ${import.meta.env.VITE_APP_NAME}`} width="96" height="96" className="mx-auto mb-6 h-24 w-auto" />
      {children}
    </div>
  );
}
