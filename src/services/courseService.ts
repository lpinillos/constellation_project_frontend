import axios from './index';
import { ITeam } from '@/interfaces/team.interface';
import Cookies from 'js-cookie';

export const studentTeam = async (courseId: string, studentId: string): Promise<ITeam[]> => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`/courses/studentTeam/${studentId}/courseId/${courseId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.users;
    } catch (error) {
        console.error(error);
        return [];
    }
}