import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { SideBarNav } from "./nav";
import { RecentChats } from "./recent-chats";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex-row justify-between">
        <span className="group-data-[state=collapsed]:hidden">Sambasa</span>
        <SidebarTrigger></SidebarTrigger>
      </SidebarHeader>
      <SidebarContent>
        <SideBarNav />
        <RecentChats />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
