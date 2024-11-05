import { ICourse } from "./course.interface";

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: string;
    courses: ICourse[];
}