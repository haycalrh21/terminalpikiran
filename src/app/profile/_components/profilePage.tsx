"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ProfilePageProps } from "@/interface/user/user";
import { usePathname } from "next/navigation";

interface ProfilePageComponentProps extends ProfilePageProps {
  children?: React.ReactNode;
}

export default function ProfilePage({
  session,
  children,
}: ProfilePageComponentProps) {
  const pathname = usePathname();

  // Tambahkan check untuk session di client side juga
  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Loading...</h2>
          <p className="text-gray-600">
            Please wait while we load your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="sidebar" session={session} />
      <SidebarInset>
        <SiteHeader pathname={pathname} />
        <div className="space-y-6 p-4 ">{children}</div>
        {/* <div className="flex flex-1 flex-col h-full">
          <div className="@container/main flex flex-1 flex-col">
            <main className=" overflow-y-auto">
              <div className="container mx-auto  max-w-7xl">
              </div>
            </main>
          </div>
        </div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
