"use client"

import { SidebarMenuButton } from "./sidebar";
import { ChevronUp } from "lucide-react";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useEffect, useState } from "react";
import { getUserByID } from "@/services/userService";

export default function UsernameSideBar() {

    const [name, setName] = useState("");
    const { user } = useCurrentUser();

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const response = await getUserByID(user.user_id);
                setName(response.name + " " + response.last_name);
            }
        }; fetchData()
    }, [user]);

    return (
        <div>
            {name}
        </div>
    );
};