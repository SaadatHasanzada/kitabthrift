export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex flex-col desktop:flex-row">{children}</div>;
}
