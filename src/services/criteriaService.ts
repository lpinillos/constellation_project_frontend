import { ICriteriaGradeSend } from "@/interfaces/criteria_grade.interface";
import axios from "./index";
import Cookies from 'js-cookie';

export const sendCriteriaGrade = async (criterias: ICriteriaGradeSend[]): Promise<ICriteriaGradeSend[]> => {
    try {
        const token = Cookies.get('token');
        const responses: ICriteriaGradeSend[] = [];

        for (const criteria of criterias) {
            const response = await axios.post<ICriteriaGradeSend>(`/criteria-grade`, criteria, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            responses.push(response.data);
        }

        return responses;

    } catch (error) {
        console.error(error);
        return [];
    }
};
