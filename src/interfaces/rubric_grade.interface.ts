import { IRubric } from "./rubric.interface";
import { IUser } from "./user.interface";

export interface IRubricGrade {
    id: string;
    grade: number;
    student: IUser;
    studentEval: IUser
    rubric: IRubric;
}