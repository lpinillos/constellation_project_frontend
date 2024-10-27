import { AxiosError } from "axios";
import axios from "./index";

interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    user_id: string;
    email: string;
    token: string;
}

interface LoginError {
    status: number;
    message: string;
}

interface ApiResponse {
    success: boolean;
    data?: LoginResponse;
    error?: LoginError;
}

export const login = async (data: LoginData): Promise<ApiResponse> => {
    try {
        const response = await axios.post<LoginResponse>("/auth/login", data);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            return {
                success: false,
                error: {
                    status: error.response?.status ?? 500,
                    message: 'Email or password is incorrect'
                }
            };
        }
        return {
            success: false,
            error: {
                status: 500,
                message: 'Something went wrong'
            }
        };
    }
};