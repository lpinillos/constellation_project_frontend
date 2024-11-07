"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppBreadcrumb() {
  const pathname = usePathname();
  const [segments, setSegments] = useState<string[]>([]);

  useEffect(() => {
    if (pathname) {
      setSegments(pathname.split("/").filter((segment) => segment));
    }
  }, [pathname]);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join("/")}`;

          return (
            <div key={href} className="flex items-center gap-5">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{capitalizeFirstLetter(segment)}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink href={href}>
                      {capitalizeFirstLetter(segment)}
                    </BreadcrumbLink>
                  </>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
