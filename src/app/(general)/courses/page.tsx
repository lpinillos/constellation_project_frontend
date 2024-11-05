"use client";

import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { ICourse } from "@/interfaces/course.interface";
import { getUserCourses } from "@/services/userService";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";
import { useEffect, useState } from "react";


export default function Courses() {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const { user } = useCurrentUser();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (user?.user_id) {
                const response = await getUserCourses(user.user_id);
                setCourses(response);
            }
        };
        fetchData();
    }, [user?.user_id]);

    function handleAddCourse(): void {
        console.log("Añadir curso");
    }

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const isProfessor = user?.role === "teacher";

    console.log(user);

    return (
        <main className="overflow-hidden">
            <h1 className="text-3xl font-semibold mb-5">Courses</h1>

            {courses.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center min-h-[70vh]">
                    <p className="text-2xl font-semibold mb-2">No courses available 😭</p>
                    <button
                        onClick={handleAddCourse}
                        className="mt-4 px-6 py-2 bg-primary font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        Add Course
                    </button>
                </div>
            ) : (
                <>
                    <div className="flex justify-center mb-8 w-full relative">
                        <input
                            type="text"
                            placeholder="Search course"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-3/4 pl-10 pr-4 py-2 rounded-md bg-[#1F1F1F] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <div className="absolute inset-y-0 left-[12.5%] flex items-center pl-3 pointer-events-none">
                            <Search className="text-white font-semibold" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6">
                        {filteredCourses.map((course) => (
                            <Card key={course.id} className="w-full scale-95 hover:scale-100 hover:cursor-pointer transition-all ease-linear rounded-lg overflow-hidden">
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
                                <CardContent className="p-4">
                                    <CardTitle className="text-xl font-bold text-white">{course.name}</CardTitle>
                                </CardContent>
                            </Card>
                        ))}

                        {isProfessor && (
                            <Card className="h-full flex justify-center items-center scale-95">
                                <CardContent className="text-center gap-2 flex flex-col py-2">
                                    <p>Add more courses so we can see them here.</p>
                                    <Link href="#">
                                        <Button>Add course</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </>
            )}
        </main>
    );
}