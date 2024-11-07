"use client";

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { useParams } from 'next/navigation';
import { IRubric } from '@/interfaces/rubric.interface';
import { getRubricById } from '@/services/rubricService';
import { sendCriteriaGrade } from '@/services/criteriaService';
import { ICriteriaGradeSend } from '@/interfaces/criteria_grade.interface';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface StudentEvalFormProps {
    rubricId?: string;
    idStu?: string;
    idStuEval?: string;
}

export default function StudentEvalForm({rubricId, idStu, idStuEval}: StudentEvalFormProps) {

    const [open, setOpen] = useState(false);

    const [rubric, setRubric] = useState<IRubric>();

    useEffect(() => {
        const fetchRubric = async () => {
            try {
                if (rubricId) {
                    const rubricData = await getRubricById(rubricId);
                    setRubric(rubricData);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchRubric();
    }, [rubricId]);

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const criterias: ICriteriaGradeSend[] = rubric?.criterias?.map((criteria, index) => ({
            criteria: criteria.id,
            grade: Number(formData.get(`grades${index}`)),
            student: idStu,
            studentEval: idStuEval
        })) || [];

        sendCriteriaGrade(criterias);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Open Evaluation
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg-sidebar rounded-lg w-full">
                    <DialogHeader>
                        <DialogTitle className="text-white text-2xl">Evaluation - {rubric?.name}</DialogTitle>
                        <DialogDescription className="text-white">
                            Evaluate your teammates performance during the develop of the activity.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
                        {rubric?.criterias?.map((criteria, index) => (
                            <div key={index} className="grid w-full items-center gap-1.5">
                                <Accordion type="single" collapsible className="w-full ">
                                    <AccordionItem className='border-none' value={`criteria-description-${index}`}>
                                        <AccordionTrigger className="text-base hover:no-underline">
                                            {criteria.name}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-xs text-gray-500 ">
                                            {criteria.description} - {criteria.percentage}%
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                <Input
                                    className='-mt-4'
                                    name={`grades${index}`}
                                    type="number"
                                    min={0}
                                    max={5}
                                    required
                                    placeholder="0 to 5"
                                />
                            </div>
                        ))}
                        <DialogFooter>
                            <Button type="submit" className="w-full" onClick={() => setOpen(false)}>
                                Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}