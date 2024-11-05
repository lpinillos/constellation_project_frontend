"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";

interface StudentModalProps {
    open: boolean;
    onClose: () => void;
    students: string[];
}

function StudentModal({ open, onClose, students }: StudentModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className=" text-white rounded-lg max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-3xl">Students</DialogTitle>
                </DialogHeader>
                <DialogDescription className="space-y-2">
                    {students.map((student, index) => (
                        <p key={index} className="text-gray-300">
                            {student}
                        </p>
                    ))}
                </DialogDescription>
                <Button onClick={onClose} className="mt-4 w-full">
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default function CoursesView() {
    const [isStudentModalOpen, setStudentModalOpen] = useState(false);

    const students = [
        "Student 1",
        "Student 2",
        "Student 3",
    ];

    return (
        <div className="min-h-screen text-white">
            <div className="relative w-full h-64">
                <Image
                    src="/images/nebulosa.webp"
                    width={500}
                    height={500}
                    alt="logo"
                    quality={50}
                    className="w-full h-full object-cover rounded-t-lg"
                />
            </div>

            <div className="p-8 space-y-6">
                <h1 className="text-3xl font-bold text-primary">Compunet 3</h1>

                <div className="w-full h-px bg-gray-500 my-4" />

                <div className="text-semibold">
                    <p onClick={() => setStudentModalOpen(true)} className="cursor-pointer underline">
                        23 Students
                    </p>
                    <p>Teacher: Darwin</p>
                </div>

                <p className="text-semibold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ad inventore placeat, cum est tempore nobis? Quos quia magnam consequatur! Quis delectus, doloremque vitae in eligendi reprehenderit iusto eius accusantium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore optio, voluptatum doloribus porro dolore laborum corrupti unde maiores repellendus, quae sequi tempore provident sunt voluptatibus harum dolor nemo cupiditate dolorum? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque quod unde repellendus veniam, eius libero veritatis hic incidunt minus rem nemo, dolores aliquam totam molestiae nesciunt alias consectetur modi velit!
                </p>

                <h2 className="text-2xl font-semibold text-primary ">Projects</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 ">
                    <Card className="w-full scale-95 hover:scale-100 hover:cursor-pointer transition-all ease-linear rounded-lg overflow-hidden">
                        <CardHeader className="p-0">
                            <Image
                                src="/images/nebulosa.webp"
                                width={500}
                                height={500}
                                alt="logo"
                                quality={50}
                                className="w-full h-[200px] object-cover rounded-lg" 
                            />
                        </CardHeader>
                        <CardContent className="p-4">
                            <CardTitle className="text-xl font-bold text-white">Compunet 3</CardTitle>
                        </CardContent>
                    </Card>

                    <Card className="w-full scale-95 hover:scale-100 hover:cursor-pointer transition-all ease-linear rounded-lg overflow-hidden">
                        <CardHeader className="p-0">
                            <Image
                                src="/images/nebulosa.webp"
                                width={500}
                                height={500}
                                alt="logo"
                                quality={50}
                                className="w-full h-[200px] object-cover rounded-lg" 
                            />
                        </CardHeader>
                        <CardContent className="p-4">
                            <CardTitle className="text-xl font-bold text-white">Compunet 3</CardTitle>
                        </CardContent>
                    </Card>

                    <Card className="w-full scale-95 hover:scale-100 hover:cursor-pointer transition-all ease-linear rounded-lg overflow-hidden">
                        <CardHeader className="p-0">
                            <Image
                                src="/images/nebulosa.webp"
                                width={500}
                                height={500}
                                alt="logo"
                                quality={50}
                                className="w-full h-[200px] object-cover rounded-lg" 
                            />
                        </CardHeader>
                        <CardContent className="p-4">
                            <CardTitle className="text-xl font-bold text-white">Compunet 3</CardTitle>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <StudentModal open={isStudentModalOpen} onClose={() => setStudentModalOpen(false)} students={students} />
        </div>
    );
}


