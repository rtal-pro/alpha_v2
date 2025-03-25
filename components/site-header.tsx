"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./toggle-mode";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import React from "react";

export function SiteHeader() {
  const pathSegments = usePathname().split("/").slice(1);

  return (
    <header className='group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear sticky top-0 bg-background rounded-t-sm'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 '>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-4'
        />
        <Breadcrumb>
          <BreadcrumbList>
            {pathSegments.map((segment, index) => {
              const fullPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
              const isLast = index === pathSegments.length - 1;

              return (
                <React.Fragment key={index}>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {isLast ? (
                      <span className="font-bold text-primary">{segment}</span> // Highlight current page
                    ) : (
                      <BreadcrumbLink href={fullPath}>{segment}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-4 ml-auto'
        />
        <ModeToggle />
      </div>
    </header>
  );
}
