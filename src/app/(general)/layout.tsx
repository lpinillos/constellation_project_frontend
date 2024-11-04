import AppBreadcrumb from "@/components/ui/app-breadcrumb";
import { AppSidebar } from "@/components/ui/app-siderbar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <nav className="flex gap-3 items-center p-4 w-full bg-sidebar border-b border-border">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <AppBreadcrumb />
        </nav>
        <section className="px-4 pt-4">{children}</section>
      </main>
    </SidebarProvider>
  );
}
