import { ICourse } from "@/interfaces/course.interface";
import axios from "./index";
import Cookies from 'js-cookie';
import { IUser } from "@/interfaces/user.interface";
import { CreateCourse } from "@/interfaces/createCourse.interface";
import { ITeam } from '@/interfaces/team.interface';

export const getCourseById = async (courseId: string): Promise<ICourse> => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`/courses/${courseId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
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
        return response.data;

    } catch (error) {
        console.error(error);
        return [];
    }
}


export async function createCourse(courseData: Partial<CreateCourse>) {
    try {
        const token = Cookies.get('token');

        const response = await axios.post(`/courses`, courseData, {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return response.data;
    } catch {
        throw new Error("Error creating course");
    }
  
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