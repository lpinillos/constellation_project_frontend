import { ICriteria } from "./criteria.interface";

export interface IRubric {
    id?: string;
    name: string;
    criterias?: ICriteria[];
    activityId?: string;

}