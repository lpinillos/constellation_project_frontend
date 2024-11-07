"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { UploadIcon } from "lucide-react";
import { uploadStudents } from "@/services/userService";

interface CourseFormProps {
  idCourse: string;
}

export default function UploadStudentsForm({ idCourse }: CourseFormProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TO DO: logica para crear subir estudiante en un curso
    if (file) {
      await uploadStudents(file, idCourse);
      setOpen(false);
    }
  };

  useEffect(() => {}, [idCourse]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Upload students</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-sidebar rounded-lg w-full max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">
              Upload students
            </DialogTitle>
            <DialogDescription className="text-white">
              Upload a CSV file with the students to be added to the course
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-6 overflow-hidden"
            onSubmit={handleOnSubmit}
          >
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById("fileInput")?.click()}
              className="border-2 border-dashed border-primary rounded-lg p-6 w-full text-center cursor-pointer"
            >
              <UploadIcon className="text-primary w-8 h-20 mx-auto mb-2" />
              <p>Drag & drop any file here</p>
              <p>
                or{" "}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  browse file
                </span>{" "}
                from device
              </p>
              <Input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
            </div>

            {file && (
              <p>Selected file: {file.name}</p>
            )}

            <Button
              type="submit"
              onClick={() => setOpen(false)}
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
