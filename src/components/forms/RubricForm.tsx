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
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  createRubricWithCriteria,
  getRubricByActivityId,
} from "@/services/rubricService";
import { ICriteria } from "@/interfaces/criteria.interface";
import { IRubric } from "@/interfaces/rubric.interface";

interface ActivityFormProps {
  idActivity: string;
}

interface Criterion {
  id: number;
  name: string;
  description: string;
  percentage: string;
}

export default function RubricForm({ idActivity }: ActivityFormProps) {
  const [open, setOpen] = useState(false);
  const [criteria, setCriteria] = useState<ICriteria[]>([
    { id: Date.now()+"", name: "", description: "", percentage: "" },
  ]);
  const [nameRubric, setNameRubric] = useState("");
  const [rubric, setRubric] = useState<IRubric[]>();

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createRubricWithCriteria(
      {
        name: nameRubric,
        activityId: idActivity,
      },
      criteria
    );
  };

  useEffect(() => {
    try {
      const fetchRubric = async () => {
        const rubric = await getRubricByActivityId(idActivity);
        setRubric(rubric);
      };
      fetchRubric();
    } catch (error) {
      console.error(error);
    }
  }, [idActivity]);

  const addCriterion = () => {
    setCriteria([
      ...criteria,
      { id: Date.now()+"", name: "", description: "", percentage: "" },
    ]);
  };

  const handleCriterionChange = (
    index: number,
    field: keyof Criterion,
    value: string
  ) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index] = { ...updatedCriteria[index], [field]: value };
    setCriteria(updatedCriteria);
  };

  return (
    <>
      {rubric?.length == 0 ? (
        <Button onClick={() => setOpen(true)}>Create Rubric</Button>
      ) : (
        <></>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-sidebar rounded-lg w-full max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">Rubric</DialogTitle>
            <DialogDescription className="text-white">
              Create a new rubric
            </DialogDescription>
            <Input
              type="text"
              value={nameRubric}
              onChange={(e) => setNameRubric(e.target.value)}
              required
              placeholder="Enter the rubric name"
            />
          </DialogHeader>
          <form
            className="flex flex-col gap-6 overflow-hidden"
            onSubmit={handleOnSubmit}
          >
            <Tabs defaultValue="criterion-0">
              <TabsList
                className="overflow-x-scroll w-full [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-2
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 overflow-y-hidden"
              >
                {criteria.map((_, index) => (
                  <TabsTrigger key={index} value={`criterion-${index}`}>
                    Criterion {index + 1}
                  </TabsTrigger>
                ))}
                <Button
                  variant="secondary"
                  onClick={addCriterion}
                  className="ml-4"
                >
                  Add Criterion
                </Button>
              </TabsList>

              {criteria.map((criterion, index) => (
                <TabsContent
                  key={criterion.id}
                  value={`criterion-${index}`}
                  className="mt-4"
                >
                  <div className="flex flex-col gap-2">
                    <Label>Name</Label>
                    <Input
                      type="text"
                      value={criterion.name}
                      onChange={(e) =>
                        handleCriterionChange(index, "name", e.target.value)
                      }
                      required
                    />
                    <Label>Description</Label>
                    <Input
                      type="text"
                      value={criterion.description}
                      onChange={(e) =>
                        handleCriterionChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      required
                    />
                    <Label>Percentage</Label>
                    <Input
                      type="number"
                      value={criterion.percentage}
                      onChange={(e) =>
                        handleCriterionChange(
                          index,
                          "percentage",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            <Button
              type="submit"
              onClick={() => setOpen(false)}
              className="mt-4"
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
