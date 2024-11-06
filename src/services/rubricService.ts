import { IRubric } from "@/interfaces/rubric.interface";
import axios from "./index";
import Cookies from 'js-cookie';

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