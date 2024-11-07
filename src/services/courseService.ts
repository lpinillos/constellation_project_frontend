import { ICourse } from "@/interfaces/course.interface";
import axios from "./index";
import Cookies from 'js-cookie';
import { IUser } from "@/interfaces/user.interface";

export const getCourseById = async (courseId: string): Promise<ICourse> => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`/courses/${courseId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response.data;

    } catch (error) {
        console.error(error);
        return {} as ICourse;
    }
}

export const getUsersByCourse = async (courseId: string): Promise<IUser[]> => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`/auth/course/${courseId}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response.data;

    } catch (error) {
        console.error(error);
        return [];
    }
}