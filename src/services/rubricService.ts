import { IRubric } from "@/interfaces/rubric.interface";
import axios from "./index";
import Cookies from 'js-cookie';
import { ICriteria } from '@/interfaces/criteria.interface';

export const getRubricById = async (rubricId: string): Promise<IRubric> => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get<IRubric>(`/rubric/${rubricId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }});
        return response.data;
    } catch (error) {
        console.error(error);
        return {} as IRubric;
    }
}

export const getRubricByActivityId = async (activityId: string): Promise<IRubric[]> => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`/rubric/activity/${activityId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [{
            id: '',
            name: '',
            criterias: [],
            activityId: '',
        }];
    }
}

export const createRubricWithCriteria = async (rubric: IRubric, criteria: ICriteria[]): Promise<ICriteria[]> => {
    try {
         const token = Cookies.get('token');
         const response = await axios.post(`/rubric`, rubric, {
             headers: {
                 Authorization: `Bearer ${token}`
             }
         });

         if (response) {
            for (const criterion of criteria) {
                await axios.post(`/criteria`, {
                    name: criterion.name,
                    description: criterion.description,
                    percentage: criterion.percentage,
                    rubric: response.data.id,
                } ,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
         }

         return response.data;
     } catch (error) {
         console.error(error);
         return [{
             id: '',
             name: '',
             description: '',
             percentage: '',
         }] as unknown as ICriteria[];
     }
 }
