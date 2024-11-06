"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getUserActivities, getUserCourses, getUserStudents, getUserTeams } from "@/services/userService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCopy, Boxes, Users } from "lucide-react";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";

export default function CardDashboard() {
  const { user } = useCurrentUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [dataCounts, setDataCounts] = useState<{ [key: string]: string }>({
    Courses: "...",
    Activities: "...",
    Students: "...",
  });

  const dataCards = useMemo(() => [
    {
      title: "Courses",
      url: "/courses",
      icon: BookCopy,
      fetchData: getUserCourses,
    },
    {
      title: "Activities",
      url: "/activities",
      icon: Boxes,
      fetchData: getUserActivities,
    },
    {
      title: user?.role === "student" ? "Teams" : "Students",
      url: user?.role === "student" ? "/teams" : "/students",
      icon: Users,
      fetchData: user?.role === "student" ? getUserTeams : getUserStudents,
    },
  ], [user]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userId: string | undefined = user?.user_id;
      if (userId) {
        const counts = await Promise.all(
          dataCards.map(async (card) => {
            const data = await card.fetchData(userId);
            return { title: card.title, count: data.length || 0 };
          })
        );

        const newCounts = counts.reduce((acc, { title, count }) => {
          acc[title] = count + "";
          return acc;
        }, {} as { [key: string]: string });

        setDataCounts(newCounts);
      }
      setLoading(false);
    };
    fetchData();
  }, [dataCards, user]);

  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 justify-items-stretch gap-x-5 gap-y-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2 lg:[&>*:last-child:nth-child(odd)]:col-span-1">
      {dataCards.map((card, index) => (
        <Link
          key={index}
          href={card.url}
          className="w-full h-[165px] scale-95 hover:scale-100 transition-all ease-linear"
        >
          <Card className="w-full h-full bg-primary text-primary-foreground flex flex-col">
            <CardHeader className="flex flex-row justify-between flex-1">
              <card.icon size={42} />
              <CardDescription
                className={`text-6xl text-primary-foreground ${loading ? "animate-pulse" : ""}`}
              >
                {loading ? "..." : dataCounts[card.title]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardTitle>
                {user?.role === "student" && card.title === "Students" ? "Teams" : card.title}
              </CardTitle>
            </CardContent>
          </Card>
        </Link>
      ))}
    </section>
  );
}
