"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ProfilePageProps } from "@/interface/user/user";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

interface ProfilePageComponentProps extends ProfilePageProps {
  children?: React.ReactNode;
}

export default function AdminPage({
  session,
  children,
}: ProfilePageComponentProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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

  const listCommand = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
      description: "Main dashboard overview",
    },
    {
      name: "Posts",
      link: "/admin/dashboard/posts",
      description: "Manage blog posts",
    },
    {
      name: "Data Posts",
      link: "/admin/dashboard/dataposts",
      description: "View posts data table",
    },
  ];

  const handleSelect = (link: string) => {
    setOpen(false);
    router.push(link);
  };

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
      <SidebarInset className="flex flex-col h-screen">
        <SiteHeader pathname={pathname} />
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-4">
            <div className="space-y-6">{children}</div>
          </div>
        </div>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              {listCommand.map((item) => (
                <CommandItem
                  key={item.name}
                  value={`${item.name} ${item.description}`}
                  onSelect={() => handleSelect(item.link)}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                  <CommandShortcut>{item.link}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </CommandDialog>
      </SidebarInset>
    </SidebarProvider>
  );
}
