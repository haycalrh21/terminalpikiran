"use client";

import * as React from "react";
import { ProfilePageProps } from "@/interface/user/user";
import {
  IconArticle,
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconTable,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = {
  navMain: [
    { title: "Profile", url: "/profile", icon: IconDashboard },
    {
      title: "Change Password",
      url: "/profile/change-password",
      icon: IconListDetails,
    },
    { title: "Update Profile", url: "/profile/update", icon: IconChartBar },
  ],
  adminNav: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Users",
      url: "/admin/dashboard/users",
      icon: IconUsers,
    },
    {
      title: "Posts",
      url: "/admin/dashboard/posts",
      icon: IconArticle,
    },
    {
      title: "Dataposts",
      url: "/admin/dashboard/dataposts",
      icon: IconTable,
    },

    {
      title: "Profile",
      url: "/profile",
      icon: IconUser,
    },
  ],
  // Admin menu items yang bisa ditambahkan ke navMain
  adminOnlyItems: [
    {
      title: "Admin Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
  ],
};

export function AppSidebar({
  session,
  ...props
}: { session: ProfilePageProps["session"] } & React.ComponentProps<
  typeof Sidebar
>) {
  const pathname = usePathname();

  // Debug log

  // Function untuk mendapatkan nav items berdasarkan role dan path
  const getNavItems = () => {
    if (pathname.startsWith("/admin") && session?.user?.role === "ADMIN") {
      return data.adminNav;
    } else {
      // Gabungkan navMain dengan admin items jika user adalah ADMIN
      const baseItems = [...data.navMain];

      if (session?.user?.role === "ADMIN") {
        // Tambahkan admin items di bagian atas atau bawah sesuai kebutuhan
        return [...data.adminOnlyItems, ...baseItems];
      }

      return baseItems;
    }
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              {/* <Link href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={getNavItems()} activePath={pathname} />
      </SidebarContent>
      <SidebarFooter>
        {session?.user && <NavUser session={session} />}
      </SidebarFooter>
    </Sidebar>
  );
}
