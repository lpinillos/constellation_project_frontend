export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full min-h-[100vh] px-4 h-full flex justify-center items-center">
      {children}
    </section>
  );
}
