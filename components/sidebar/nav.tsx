"use client";

import {
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";

import { SquarePen, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function SideBarNav() {
  const router = useRouter();

  return (
    <>
      <SidebarGroup>
        <SidebarMenu className="">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                router.push("/");
                router.refresh();
              }}
              tooltip="New Chat"
            >
              <SquarePen className="size-7" />
              <span className="group-data-[state=collapsed]:hidden">
                New Chat
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/chats/search">
              <SidebarMenuButton tooltip="Search Chat">
                <Search className="size-7" />
                <span className="group-data-[state=collapsed]:hidden">
                  Search Chat
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      {/*<SidebarGroup>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/chats">
                <SidebarMenuButton tooltip="Chats">
                  <MessageCircle className="size-7" />
                  <span className="group-data-[state=collapsed]:hidden">Chats</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/agents">
                <SidebarMenuButton tooltip="Agents">
                  <Bot className="size-7" />
                  <span className="group-data-[state=collapsed]:hidden">Agents</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/projects">
                <SidebarMenuButton>
                  <Folders className="size-7" />
                  <span className="group-data-[state=collapsed]:hidden">Projects</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </SidebarGroup>*/}
    </>
  );
}
