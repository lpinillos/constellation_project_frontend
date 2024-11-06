import { ICourse } from "@/interfaces/course.interface";
import axios from "./index";
import Cookies from 'js-cookie';
import { IUser } from "@/interfaces/user.interface";
import { CreateCourse } from "@/interfaces/createCourse.interface";

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
    } catch (error) {
        throw new Error("Error creating course");
    }
}