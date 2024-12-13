import AuthLayout from "@/app/layouts/authLayout";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: RootLayoutProps) {
  return <AuthLayout>{children}</AuthLayout>;
}
