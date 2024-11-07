import axios from './index';
import Cookies from 'js-cookie';
import { ISchedule } from '@/interfaces/schedule.interface';
import { ISkill } from '@/interfaces/skill.interface';


export const createSchedule = async (schedule: ISchedule): Promise<ISchedule> => {
    try {
        const token = Cookies.get('token');
        const response = await axios.post('/schedule', schedule, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return {} as ISchedule;
    }
}

export const createSkill = async (skillId: string, userId:string): Promise<ISkill> => {
    console.log(skillId);
    console.log(userId);
    try {
        const token = Cookies.get('token');
        const response = await axios.post(`/skills/${skillId}/user/${userId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return {} as ISkill;
    }
}