"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { ICourse } from "@/interfaces/course.interface";
import { getUserCourses } from "@/services/userService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardCarousel() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      if (user?.user_id) {
        const response = await getUserCourses(user.user_id);
        setCourses(response);
      }
      setLoading(false);
    };
    fetchData();
  }, [user?.user_id]);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full relative hover:cursor-grab"
    >
      <CarouselContent className="h-[250px]">
        {loading ? (
          Array(3)
            .fill(null)
            .map((_, index) => (
              <CarouselItem
                key={`skeleton-${index}`}
                className="md:basis-1/2 lg:basis-1/3 scale-95"
              >
                <Card className="h-full flex flex-col justify-between">
                  <CardHeader className="p-0">
                    <Skeleton className="w-full h-[200px]" />
                  </CardHeader>
                  <CardContent className="p-2">
                    <Skeleton className="h-6 w-3/4" />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
        ) : (
          courses.map((course) => (
            <CarouselItem
              key={course.id}
              className="md:basis-1/2 lg:basis-1/3 scale-95 hover:scale-100 transition-all ease-linear hover:cursor-pointer"
            >
              <Card className="h-full flex flex-col">
                <CardHeader className="p-0">
                  <Image
                    src="/images/nebulosa.webp"
                    width={500}
                    height={500}
                    alt="logo"
                    quality={50}
                    className="w-full h-[200px] object-cover"
                  />
                </CardHeader>
                <CardContent className="px-4 py-2">
                  <span className="text-lg font-semibold">{course.name}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))
        )}
        <CarouselItem className="md:basis-1/2 lg:basis-1/3 scale-95">
          <Card className="h-full flex justify-center items-center">
            <CardContent className="text-center gap-2 flex flex-col py-2">
              <p>Add more courses so we can see them here.</p>
              <Link href="#">
                <Button>Add course</Button>
              </Link>
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 bottom-0 z-10" />
      <CarouselNext className="absolute right-4 bottom-0 z-10" />
    </Carousel>
  );
}
