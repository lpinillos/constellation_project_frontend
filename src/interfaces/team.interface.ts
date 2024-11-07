
import { ICourse } from './course.interface';
import { IUser } from './user.interface';

export interface ITeam {
    id: string;
    name: string;
    course: ICourse;
    users: IUser[];
}