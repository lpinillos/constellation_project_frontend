import { IUser } from "@/interfaces/user.interface";
import axios from "./index";
import { ICourse } from "@/interfaces/course.interface";
import { IActivity } from "@/interfaces/activity.interface";
import Cookies from 'js-cookie';
import { ISkill } from "@/interfaces/skill.interface";

export const getUserCourses = async (userId: string): Promise<ICourse[]> => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get<IUser>(`/auth/${userId}` , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.courses;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getUserTeams = async (userId: string): Promise<IUser[]> => {
    try {
        const response = await axios.get<IUser[]>(`/auth/teams/${userId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getUserActivities = async (userId: string): Promise<IActivity[]> => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get<IActivity[]>(`/activities/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getUserStudents = async (userId: string): Promise<IUser[]> => {
    try {
        const response = await axios.get<IUser[]>(`/auth/students/${userId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }

}

export const getStudentsSkills = async (userId: string): Promise<IUser[]> => {
    try {
        const response = await axios.get<IUser[]>(`/auth/students/skills/${userId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });

        console.log("ESTAS SON LAS SKILLS: ", response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}



export const getUserByID = async (userId: string): Promise<IUser> => {
    try {
        const response = await axios.get<IUser>(`/auth/${userId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return {} as IUser;
    }
}

export const uploadStudents = async (file: File, courseId: string): Promise<void> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        await axios.post(`/auth/uploadStudents/${courseId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export const getSkills = async (): Promise<ISkill[]> => {
    try {
        const response = await axios.get<ISkill[]>('/skills', {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getSkillByID = async (skillId: string): Promise<ISkill> => {
    try {
        const response = await axios.get<ISkill>(`/skills/${skillId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return {} as ISkill;
    }
}

