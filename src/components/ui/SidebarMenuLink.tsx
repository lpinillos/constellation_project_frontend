"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";

interface SidebarMenuLinkProps {
  url: string;
  title: string;
  icon: ReactNode;
}

function SidebarMenuLink({ url, title, icon: Icon }: SidebarMenuLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link
      href={url}
      className={`flex items-center gap-2 p-1 rounded-md hover:bg-primary ${
        isActive ? "bg-primary text-white" : ""
      }`}
    >
      {Icon}
      <span>{title}</span>
    </Link>
  );
}

export default SidebarMenuLink;
