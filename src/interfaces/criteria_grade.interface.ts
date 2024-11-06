import { ICriteria } from "./criteria.interface";
import { IUser } from "./user.interface";

export interface ICriteriaGrade {
    id?: string;
    grade: number;
    student: IUser;
    studentEval: IUser
    criteria: ICriteria;
}

export interface ICriteriaGradeSend {
    grade: number;
    student: string;
    studentEval: string
    criteria: string;
}