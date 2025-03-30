"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  AppWindow,
  BadgeCheck,
  BrainCogIcon,
  Building,
  CalendarPlus,
  Settings,
  UsersIcon,
  SquareArrowOutUpRight,
  SquareArrowDownLeftIcon,
  ChevronDown,
  Building2,
  House,
  MapPinHouse,
  LandPlot,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const brandItem = {
  title: "OPEXA",
  url: "/",
  icon: BrainCogIcon,
};

const applicationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: AppWindow,
  },
  {
    title: "Prestataires",
    url: "/dashboard/providers",
    icon: Wrench,
    subset: [
      {
        title: "Internes",
        url: "/dashboard/providers/internals",
        icon: SquareArrowDownLeftIcon,
      },
      {
        title: "Externes",
        url: "/dashboard/providers/externals",
        icon: SquareArrowOutUpRight,
      },
    ],
  },
  {
    title: "Localisations",
    url: "/dashboard/localisations",
    icon: LandPlot,
    subset: [
      {
        title: "Clusters",
        url: "/dashboard/localisations/clusters",
        icon: Building2,
      },
      {
        title: "Buildings",
        url: "/dashboard/localisations/buildings",
        icon: House,
      },
      {
        title: "Spots",
        url: "/dashboard/localisations/spots",
        icon: MapPinHouse,
      }
    ],
  },
  {
    title: "Planning",
    url: "/dashboard/plannings",
    icon: CalendarPlus,
  },
];

const adminItems = [
  {
    title: "Utilisateurs",
    url: "/dashboard/users",
    icon: UsersIcon,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <Sidebar variant='inset'>
      {/* Brand Header */}
      <SidebarHeader>
        <div className='flex items-center gap-2 p-4 hover:bg-muted rounded-md transition-colors'>
          <brandItem.icon />
          <span className='font-bold text-2xl'>{brandItem.title}</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Application Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {applicationItems.map((item) => {
                const hasSubset = !!item.subset;
                const isSubActive = hasSubset && item.subset.some((sub) => pathname === sub.url);
                const isActive = pathname === item.url || isSubActive;
                const isOpen = openMenus[item.title] || isActive;

                return (
                  <div key={item.title}>
                    {/* Parent Item */}
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <div
                          className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                            isSubActive ? "text-primary" : isActive ? "text-secondary bg-muted" : "text-primary"
                          }`}
                          onClick={() => hasSubset && toggleMenu(item.title)}
                        >
                          <Link href={item.url} className='flex items-center gap-2 flex-grow'>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                          {hasSubset && <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Subset Items */}
                    {hasSubset && isOpen && (
                      <div className='pl-6'>
                        {item.subset.map((subItem) => {
                          const isSubActive = pathname === subItem.url;
                          return (
                            <SidebarMenuItem key={subItem.title}>
                              <SidebarMenuButton asChild>
                                <Link
                                  href={subItem.url}
                                  className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                                    isSubActive ? "text-secondary bg-muted" : "text-primary"
                                  }`}
                                >
                                  <subItem.icon />
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                          isActive ? "text-secondary bg-muted" : "text-primary"
                        }`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <div className='flex items-center'>
          <button className='w-full inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-600 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-500'>
            <Link href='/'>Logout</Link>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
