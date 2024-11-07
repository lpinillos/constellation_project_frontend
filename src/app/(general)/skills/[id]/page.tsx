'use client'
import { Progress } from "@/components/ui/progress"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useEffect, useState } from "react"
import { getSkills } from "@/services/userService"
import { ISkill } from "@/interfaces/skill.interface"
import { Button } from "@/components/ui/button"
import { getSkillByID } from "@/services/userService"
import { Provider } from "react-redux";
import store from "@/redux/store";
import { addSkill, removeSkill, setSkills } from "@/redux/slices"

const SkillsScreen = ({ skills, rowsConfiguration, onNext }: {
    skills: ISkill[],
    rowsConfiguration: any[],
    onNext: () => void
}) => {

    const [selectedSkills, setSelectedSkills] = useState<ISkill[]>([]);

    const handleSkillSelection = async (skillId: string) => {

        const skillExists = selectedSkills.some(skill => skill.id === skillId);

        if (skillExists) {
            setSelectedSkills(selectedSkills.filter(skill => skill.id !== skillId));
            console.log("Skill eliminada: ", skillId);
        } else {
            const response = await getSkillByID(skillId);
            setSelectedSkills([...selectedSkills, response]);
            console.log("Skill añadida: ", response);
        }
    };

    return (
        <Provider store={store}>
            <div className="w-full flex justify-start pt-8">
                <h1 className="text-4xl font-semibold">Skills Survey</h1>
            </div>
            <div className="w-full flex justify-start pt-4">
                <h2 className="text-xl font-semibold">What programming languages do you know?</h2>
            </div>
            <div className="w-full max-w-3xl mt-8">
                {rowsConfiguration.map((row, rowIndex) => (
                    <ToggleGroup
                        key={rowIndex}
                        type="multiple"
                        className="flex justify-center gap-4 mb-4"
                    >
                        {skills
                            .slice(row.startIndex, row.startIndex + row.items)
                            .map((skill) => (
                                <ToggleGroupItem
                                    onClick={() => handleSkillSelection(skill.id)}
                                    key={skill.id}
                                    value={skill.id.toString()}
                                    className="h-[8vh] px-16 text-xl bg-zinc-800 hover:bg-zinc-700 data-[state=on]:bg-zinc-600"
                                >
                                    {skill.name}
                                </ToggleGroupItem>
                            ))}
                    </ToggleGroup>
                ))}
            </div>
            <Button onClick={onNext} className="h-[5vh] w-[15vh] text-lg mt-8">Next</Button>
        </Provider>
    )
}

const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];


const ScheduleScreen = ({ onNext, onBack }: {
    onNext: () => void,
    onBack: () => void
}) => {
    const [schedule, setSchedule] = useState(
        daysOfWeek.map(day => ({
            day,
            openTime: "08:00 AM",
            closeTime: "08:00 PM",
            isOpen: false,
        }))
    );

    const handleTimeChange = (index: number, timeType: 'openTime' | 'closeTime', value: string) => {
        const newSchedule = [...schedule];
        newSchedule[index][timeType] = value;
        setSchedule(newSchedule);
    };

    const handleToggleOpen = (index: number) => {
        const newSchedule = [...schedule];
        newSchedule[index].isOpen = !newSchedule[index].isOpen;
        setSchedule(newSchedule);
    };

    return (
        <>
            <div className="w-full flex justify-start pt-8">
                <h1 className="text-4xl font-semibold">Schedule Survey</h1>
            </div>
            <div className="w-full flex justify-start pt-4">
                <h2 className="text-xl font-semibold">At what time are you available?</h2>
            </div>
            <div className="w-full max-w-4xl mt-16 space-y-6">
                {schedule.map((daySchedule, index) => (
                    <div key={index} className="bg-zinc-900 p-4 rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-white">{daySchedule.day}</h3>
                            <input
                                type="checkbox"
                                checked={daySchedule.isOpen}
                                onChange={() => handleToggleOpen(index)}
                                className="scale-150"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <input
                                type="time"
                                value={daySchedule.openTime}
                                onChange={(e) => handleTimeChange(index, 'openTime', e.target.value)}
                                className="w-28 px-2 py-1 bg-zinc-800 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                            />
                            <span className="text-white">-</span>
                            <input
                                type="time"
                                value={daySchedule.closeTime}
                                onChange={(e) => handleTimeChange(index, 'closeTime', e.target.value)}
                                className="w-28 px-2 py-1 bg-zinc-800 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>
                    </div>
                ))}
            </div>


            <div className="flex gap-4 mt-8">
                <Button onClick={onBack} className="h-[5vh] w-[15vh] text-lg">Back</Button>
                <Button onClick={onNext} className="h-[5vh] w-[15vh] text-lg">Next</Button>
            </div>
        </>

    );
}

const EndPage = ({ onNext, onBack }: {
    onNext: () => void,
    onBack: () => void
}) => {
    return (
        <div className="w-full flex flex-col items-center justify-center min-h-[60vh]">
            {/* Icono y mensaje de éxito */}
            <div className="flex flex-col items-center mb-6">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <h1 className="text-5xl font-semibold text-white">All set up!</h1>
                <p className="text-xl text-gray-300 mt-2">You're ready to enjoy the app.</p>
            </div>

            {/* Botones de navegación */}
            <div className="flex gap-4 mt-8">
                <Button onClick={onBack} className="h-[5vh] w-[15vh] text-lg">Back</Button>
                <Button onClick={onNext} className="h-[5vh] w-[15vh] text-lg">Send Survey</Button>
            </div>
        </div>
    );
};



export default function skills() {
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [currentScreen, setCurrentScreen] = useState(1);

    useEffect(() => {
        const handleSkills = async () => {
            const response = await getSkills();
            setSkills(response);
        }; handleSkills();
    }, []);

    const rowsConfiguration = [
        { startIndex: 0, items: 3 },
        { startIndex: 2, items: 5 },
        { startIndex: 6, items: 3 },
        { startIndex: 9, items: 6 },
        { startIndex: 12, items: 3 },
        { startIndex: 15, items: 2 },
    ];

    const getProgressValue = () => {
        return currentScreen * 33.33;
    }


    return (
        <div className="w-full flex flex-col items-center">
            <Progress value={getProgressValue()} className="h-4" />

            {currentScreen === 1 && (
                <SkillsScreen
                    skills={skills}
                    rowsConfiguration={rowsConfiguration}
                    onNext={() => setCurrentScreen(2)}
                />
            )}

            {currentScreen === 2 && (
                <ScheduleScreen
                    onNext={() => setCurrentScreen(3)}
                    onBack={() => setCurrentScreen(1)}
                />
            )}

            {currentScreen === 3 && (
                <EndPage
                    onNext={() => setCurrentScreen(4)}
                    onBack={() => setCurrentScreen(2)}
                />
            )}

        </div>
    );
}