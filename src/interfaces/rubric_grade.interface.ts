import { IRubric } from "./rubric.interface";
import { IUser } from "./user.interface";

export interface IRubricGrade {
    id?: string;
    grade?: number;
    studentEval: IUser
    rubric?: IRubric;
}

export interface IRubricGradeSend {
    rubricId?: string;
    studentEval?: string
}