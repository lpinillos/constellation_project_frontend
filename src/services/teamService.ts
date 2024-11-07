import axios from "./index";
import { ITeam } from "@/interfaces/team.interface";
import Cookies from 'js-cookie';



export const getTeams = async (courseId:string ):  Promise<ITeam[]> =>{
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`/team/courseId/${courseId}`, {
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


