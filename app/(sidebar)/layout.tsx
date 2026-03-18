import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session) redirect("/login");

  const sidebarCookieState = (await cookies()).get("sidebar_state");

  return (
    <SidebarProvider defaultOpen={sidebarCookieState?.value !== "false"}>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
