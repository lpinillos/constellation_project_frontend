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

export default function AppBreadcrumb() {

  const pathname = usePathname();
  const segment = pathname.split("/").filter((segment) => segment);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        
        {
          segment.map((segment, index) => {
            const isLast = index === segment.length - 1;
            const href = `/${segment}`;
            return (
              <BreadcrumbItem key={segment}>
                {isLast ? (
                  <BreadcrumbPage>{capitalizeFirstLetter(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{capitalizeFirstLetter(segment)}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            );
          })
        }

      </BreadcrumbList>
    </Breadcrumb>
  );
}
