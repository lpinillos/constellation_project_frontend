import { IActivity } from "@/interfaces/activity.interface";
import axios from './index';
import Cookies from 'js-cookie';


export const findOne = async (id: string): Promise<IActivity> => {

   try {
        const token = Cookies.get('token');
        const response = await axios.get(`/activities/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return {
            id: '',
            name: '',
            description: '',
            course: ''
        } as IActivity;
    }
}



export const createActivity = async (activity: IActivity): Promise<IActivity> => {
    console.log(activity);
    try {
        const token = Cookies.get('token');
        const response = await axios.post('/activities', activity, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return {
            id: '',
            name: '',
            description: '',
            course: ''
        } as IActivity;
    }
}


