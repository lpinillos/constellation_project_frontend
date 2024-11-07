import { ICourse } from "./course.interface";
import { ISkill } from "./skill.interface";

export interface IUser {
    id: string;
    name: string;
    last_name: string;
    email: string;
    courses: ICourse[];
    role: string;
    last_name: string;
    skills: ISkill[];
}