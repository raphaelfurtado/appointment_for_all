import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
import { signOut } from "../contexts/AuthContext";
import 'dotenv/config';

export function setupAPIClient(ctx = undefined){
    let cookies = parseCookies(ctx);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const api = axios.create({
        baseURL: apiUrl,
        headers: {
            Authorization: `Bearer ${cookies["@nextauth.token"]}`
        }
    });

    api.interceptors.response.use(response => {
        return response
    }, (error: AxiosError) => {
        if(error.response?.status === 401){
            //não autorizado
            if(typeof window !== undefined){
                signOut();
            } else {
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error);
    })

    return api;
}