"use client";

import { useLogout } from "@/hooks/auth/useLogout";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function BtnLogout() {

  const { handleLogout } = useLogout();

  return (
    <DropdownMenuItem onClick={() => handleLogout()} className="hover:cursor-pointer">
      <span>Sign out</span>
    </DropdownMenuItem>
  );
}
