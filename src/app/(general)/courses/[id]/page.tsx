"use client"

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import { ICourse } from '@/interfaces/course.interface';
import { getCourseById, getUsersByCourse } from '@/services/courseService';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IUser } from '@/interfaces/user.interface';
import { useParams } from 'next/navigation';
import ActivityForm from '@/components/forms/ActivityForm';
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";



interface StudentModalProps {
    open: boolean;
    onClose: () => void;
    students: IUser[];
}

function StudentModal({ open, onClose, students }: StudentModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className=" text-white rounded-lg max-w-lg ">
                <DialogHeader>
                    <DialogTitle className="text-3xl">Students</DialogTitle>
                </DialogHeader>
                <DialogDescription className="space-y-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Last name</TableHead>
                                <TableHead>Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students && students?.length > 0 ? (
                                students
                                    .filter(student => student.role !== 'teacher')
                                    .map((student, index) => (
                                        <TableRow key={student.id} className="hover:cursor-pointer">
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.last_name}</TableCell>
                                            <TableCell>{student.email}</TableCell>
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        No students found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
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
    const [course, setCourse] = useState<ICourse>();
    const [users, setUsers] = useState<IUser[]>([]);
    const { user } = useCurrentUser();
    const isProfessor = user?.role === "teacher";

    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const courseData = await getCourseById(id);
                setCourse(courseData);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCourse();
    }, [id]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsersByCourse(id);
                setUsers(usersData);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, [id]);


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
                <h1 className="text-3xl font-bold text-primary">{course?.name}</h1>

                <div className="w-full h-px bg-gray-500 my-4" />

                <div className="flex justify-between items-center">
                    <p onClick={() => setStudentModalOpen(true)} className="cursor-pointer underline font-semibold hover:text-primary">
                        {users.filter(user => user.role !== 'teacher').length} Students
                    </p>

                </div>

                <p className='font-semibold'>Teacher: {users.find(user => user.role === 'teacher')?.name || 'No teacher found'} </p>

                <p>
                    {course?.description}
                </p>

                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-primary">Activities</h2>
                    {isProfessor && <ActivityForm idCourse={id} />}
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {course && course?.activities.length > 0 ? (
                            course?.activities.map((activity, index) => (
                                <TableRow key={activity.id} className="hover:cursor-pointer" onClick={() => window.location.href = `/courses/${course.id}/activity/${activity.id}`}>
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
            </div>
            
            <StudentModal open={isStudentModalOpen} onClose={() => setStudentModalOpen(false)} students={users?.map(user => user) || []} />
        </div>
    );
}