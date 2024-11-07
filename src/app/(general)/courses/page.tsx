"use client";


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CreateCourseForm from "@/components/forms/CreateCourseForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { ICourse } from "@/interfaces/course.interface";
import { getUserCourses } from "@/services/userService";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Courses() {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const { user } = useCurrentUser();
    const [searchTerm, setSearchTerm] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false); 

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
        setShowCreateForm(!showCreateForm);
    }

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isProfessor = user?.role === "teacher";

    const handleCourseCreated = async () => {
        if (!user) return;
        const response = await getUserCourses(user.user_id);
        setCourses(response);
        setShowCreateForm(false);
    };

    return (
        <main className="overflow-hidden">
            <h1 className="text-3xl font-semibold mb-5">Courses</h1>

            {showCreateForm && <CreateCourseForm onCourseCreated={handleCourseCreated} />} {/* Formulario */}

            {courses.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center min-h-[70vh]">
                    <p className="text-2xl font-semibold mb-2">No courses available 😭</p>
                    {isProfessor && (
                        <Button onClick={handleAddCourse} className="mt-4">
                            Add Course
                        </Button>
                    )}
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
                            <Link href={`/courses/${course.id}`} key={course.id}>
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
                            </Link>
                        ))}

                        {isProfessor && (
                            <Card className="h-full flex justify-center items-center scale-95">
                                <CardContent className="text-center gap-2 flex flex-col py-2">
                                    <p>Add more courses so we can see them here.</p>
                                    <Button onClick={handleAddCourse}>Add course</Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </>
            )}
        </main>
    );
}
