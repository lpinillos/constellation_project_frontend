"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function StudentEvalForm() {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Open Evaluation
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg-sidebar rounded-lg w-full">
                    <DialogHeader>
                        <DialogTitle className="text-white text-3xl">Evaluation</DialogTitle>
                        <DialogDescription className="text-white">
                            Student Evaluation - Rate from 1 to 5
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Input placeholder="Contribution to the project" className="bg-[#1F1F1F]" />
                        <Input placeholder="Participation in meetings" className="bg-[#1F1F1F]" />
                        <Input placeholder="Continuous communication" className="bg-[#1F1F1F]" />
                        <Input placeholder="Helps the team" className="bg-[#1F1F1F]" />
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setOpen(false)} className="w-full">
                            Submit
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}