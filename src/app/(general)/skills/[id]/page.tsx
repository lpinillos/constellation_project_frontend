'use client'
import { Progress } from "@/components/ui/progress"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { getSkillByID } from "@/services/userService"
import { ISkill } from "@/interfaces/skill.interface"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addSkill, removeSkill } from "@/redux/slices/skillSlice"
import { useState, useEffect } from "react"
import { getSkills } from "@/services/userService"
import ReduxProviders from "@/components/providers/ReduxProviders"
import { ISchedule } from "@/interfaces/schedule.interface"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"
import { createSkill } from "@/services/surveyService"
import { createSchedule } from "@/services/surveyService"
import Link from 'next/link'

const SkillsScreen = ({ skills, rowsConfiguration, onNext }: {
    skills: ISkill[],
    rowsConfiguration: { startIndex: number, items: number }[],
    onNext: () => void
}) => {
    const dispatch = useAppDispatch();
    const selectedSkills = useAppSelector((state) => state.skills.selectedSkills);
    const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

    const handleSkillSelection = async (skillId: string) => {
        const skillExists = selectedSkills.some(skill => skill.id === skillId);

        if (skillExists) {
            dispatch(removeSkill(skillId));
        } else {
            const response = await getSkillByID(skillId);
            dispatch(addSkill(response));
        }
    };

    const isSkillSelected = (skillId: string) => selectedSkills.some(skill => skill.id === skillId);

    const handleNext = () => {
        if (selectedSkills.length === 0) { // Validación de selección de al menos una habilidad
            setErrorMessage("You need to choose at least 1 option");
        } else {
            setErrorMessage("");
            onNext();
        }
    };

    return (
        <>
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
                        value={selectedSkills.map(skill => skill.id.toString())}
                    >
                        {skills
                            .slice(row.startIndex, row.startIndex + row.items)
                            .map((skill) => (
                                <ToggleGroupItem
                                    onClick={() => handleSkillSelection(skill.id)}
                                    key={skill.id}
                                    value={skill.id.toString()}
                                    className="h-[8vh] px-16 text-xl bg-zinc-800 hover:bg-zinc-700 data-[state=on]:bg-zinc-600"
                                    aria-pressed={isSkillSelected(skill.id)}
                                >
                                    {skill.name}
                                </ToggleGroupItem>
                            ))}
                    </ToggleGroup>
                ))}
            </div>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>} {/* Mensaje de error */}
            <Button onClick={handleNext} className="h-[5vh] w-[15vh] text-lg mt-8">Next</Button>
        </>
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

    const selectedSkills = useAppSelector((state) => state.skills.selectedSkills);
    const { user } = useCurrentUser();

    const [addSchedule, setAddSchedule] = useState<ISchedule[]>([]);

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

    const handleAddSchedule = (day: string, hour_i: string, hour_f: string, state: boolean) => {
        if (user) {
            const newScheduleEntry = {day, hour_i, hour_f, state, user: user.user_id };

            if (!state) {
                setAddSchedule(prevSchedule => [...prevSchedule, newScheduleEntry]);
                console.log("Horario añadido: ", newScheduleEntry);
            } else {
                setAddSchedule(prevSchedule => prevSchedule.filter(item => item.day !== day || item.hour_i !== hour_i || item.hour_f !== hour_f));
                console.log("Horario eliminado: ", newScheduleEntry);
            }
        }
    };

    const handleOnSubmit = async () => {
        console.log("ESTA ENTRANDOOOOOOO")
        // Crear las habilidades seleccionadas
        if (user) {
            for (let i = 0; i < selectedSkills.length; i++) {
                await createSkill(selectedSkills[i].id, user?.user_id);
                console.log("Habilidad enviada: ", selectedSkills[i]);
            }


            // Crear los horarios
            for (let i = 0; i < addSchedule.length; i++) {
                await createSchedule(addSchedule[i]);
                console.log("Horario enviado: ", addSchedule[i]);
            }
        }

        // Después de enviar, puedes realizar cualquier otra acción como redirigir o mostrar un mensaje
        onNext();
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
                                onClick={() => handleAddSchedule(daySchedule.day, daySchedule.openTime, daySchedule.closeTime, daySchedule.isOpen)}
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
                <Button onClick={handleOnSubmit} className="h-[5vh] w-[15vh] text-lg">Submit Survey</Button>
            </div>
        </>

    );
}

const EndPage = ({}: {
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
                <p className="text-xl text-gray-300 mt-2">You are ready to enjoy the app.</p>
            </div>

            {/* Botones de navegación */}
            <div className="flex gap-4 mt-8">
                <Link href='/dashboard'><Button className="h-[5vh] w-[15vh] text-lg">Enjoy The App!</Button></Link>
            </div>
        </div>
    );
};



export default function Skills() {
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [currentScreen, setCurrentScreen] = useState(1);

    useEffect(() => {
        const handleSkills = async () => {
            const response = await getSkills();
            setSkills(response);
            console.log("Skills: ", response);
        }; handleSkills();
    }, []);

    const rowsConfiguration = [
        { startIndex: 0, items: 4 },
        { startIndex: 4, items: 4 },
        { startIndex: 8, items: 4 },
        { startIndex: 12, items: 4 },
        { startIndex: 16, items: 3 },
        { startIndex: 19, items: 4 },
    ];

    const getProgressValue = () => {
        return currentScreen * 33.33;
    }


    return (
        <ReduxProviders>
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
            </div >
        </ReduxProviders>


    );
}