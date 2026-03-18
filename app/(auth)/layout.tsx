export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-screen h-screen flex mx-auto p-6 space-y-4 text-white justify-center items-center">
      <div className="w-md flex flex-col gap-4">{children}</div>
    </main>
  );
}
