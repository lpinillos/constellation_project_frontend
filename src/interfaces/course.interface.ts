import { IActivity } from "./activity.interface";
import { IUser } from "./user.interface";

export interface ICourse {
    id: string;
    name: string;
    description: string;
    activities: IActivity[];
    users: IUser[];
}