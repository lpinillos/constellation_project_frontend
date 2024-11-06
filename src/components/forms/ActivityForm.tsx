"use client";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label} from "@/components/ui/label";
import { useState } from "react";
import { createActivity } from "@/services/activityService";

export default function ActivityForm() {
  const [open, setOpen] = useState(false);
  const idCourse = "310a684d-8586-410e-a903-a0e23966226e";

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("nombre") as string;
    const description = formData.get("descripcion") as string;

    createActivity({ course_id: idCourse, name, description });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Evaluation</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-sidebar rounded-lg w-full">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">Activity</DialogTitle>
            <DialogDescription className="text-white">
              Fill the form to create a new activity
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-6"
            onSubmit={handleOnSubmit}
        
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="nombre" >
                Name
              </Label>
              <Input
                id="nombre"
                type="text"
                name="nombre"
                placeholder="Activity name"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="descripcion"
               
              >
                Description
              </Label>
              <Input
                id="descripcion"
                name="descripcion"
               
                placeholder="Describe here..."
                required
              />
            </div>
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
