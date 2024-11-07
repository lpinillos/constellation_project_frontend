import { useEffect, useState } from "react";
import Cookies from 'js-cookie'; 
import { jwtDecode } from "jwt-decode";
import { IToken } from "@/interfaces/token.interface";

export const useCurrentUser = () => {
    const [user, setCurrentUser] = useState<IToken | null>(null); 

    useEffect(() => {
        const token = Cookies.get('token'); 
        if(token){
            const decodedToken = jwtDecode<IToken>(token);
            setCurrentUser(decodedToken);
        }
    }, []);
    
    const updateUser = (newToken: string) => {
        const decodedToken = jwtDecode<IToken>(newToken);
        setCurrentUser(decodedToken);
        Cookies.set('token', newToken);
    };
    
    return { user, updateUser };
};