"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { IActivity } from "@/interfaces/activity.interface";
import { getUserActivities } from "@/services/userService";
import { useEffect, useState } from "react";

export default function DashboardTable() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const { user } = useCurrentUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.user_id) {
        const response = await getUserActivities(user.user_id);
        setActivities(response.slice(0, 9));
      }
      setLoading(false);
    };
    fetchData();
  }, [user?.user_id]);

  return (
    <Table>
      <TableCaption>A list of your recent activities.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              Loading activities...
            </TableCell>
          </TableRow>
        ) : activities.length > 0 ? (
          activities.map((activity, index) => (
            <TableRow key={activity.id} className="hover:cursor-pointer">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{activity.name}</TableCell>
              <TableCell>{activity.description}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No activities found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
