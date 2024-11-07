import { Book, ChevronUp, LayoutDashboard } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import SidebarMenuLink from "./SidebarMenuLink";
import BtnLogout from "./btn-logout";
import Link from "next/link";
import UsernameSideBar from "./usernameSideBar";
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: <Book />,
  },
];

export function AppSidebar() {


  return (
    <Sidebar>
      <SidebarHeader className="pt-[14px] pb-[14px] border-b">
        <SidebarMenu>
          <SidebarMenuItem className="text-center">
            <Link href="/dashboard" className="text-primary font-bold text-2xl">Constellation</Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild color="purple">
                    <SidebarMenuLink
                      url={item.url}
                      title={item.title}
                      icon={item.icon}
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <UsernameSideBar />
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] bg-[var(--background)] text-white"
              >
                <Link href="/updateProfile">
                  <DropdownMenuItem className="cursor-pointer">
                    Update Password
                  </DropdownMenuItem>
                </Link>
                <BtnLogout />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
