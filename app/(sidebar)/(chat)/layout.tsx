export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col items-center mx-auto">{children}</div>
  );
}
