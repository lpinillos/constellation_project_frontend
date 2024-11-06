import { ICourse } from "./course.interface";

export interface IUser {
    id: string;
    name: string;
    last_name: string;
    email: string;
    courses: ICourse[];
}