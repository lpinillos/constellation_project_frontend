// src/components/CreateCourseForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createCourse } from "@/services/courseService";

interface CreateCourseFormProps {
    onCourseCreated: () => void;
}

export default function CreateCourseForm({ onCourseCreated }: CreateCourseFormProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [users, setUsers] = useState<string[]>([]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await createCourse({ name, description, users});

        if (success) {
            onCourseCreated(); 
            setName("");
            setDescription("");
            setUsers([]);
        } else {
            alert("Error al crear el curso.");
        }
    };

    return (
        <Card className="w-full p-4 mb-4">
            <CardHeader>
                <CardTitle>Create New Course</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 text-white">Course Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-2 rounded-md bg-[#1F1F1F] text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-white">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full p-2 rounded-md bg-[#1F1F1F] text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-white">User IDs (separated by commas)</label>
                        <input
                            type="text"
                            value={users.join(",")}
                            onChange={(e) => setUsers(e.target.value.split(",").map(id => id.trim()))}
                            required
                            className="w-full p-2 rounded-md bg-[#1F1F1F] text-white"
                        />
                    </div>
                    <Button type="submit">Create Course</Button>
                </form>
            </CardContent>
        </Card>
    );
}
