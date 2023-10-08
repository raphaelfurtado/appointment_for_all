import { createContext, ReactNode, useState, useEffect } from 'react';
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from 'next/router';
import { api } from '../services/apiClient';
import { toast } from "react-toastify";

type AuthContextData = {
    user?: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    avatar: Avatar;
}

type Avatar = {
    id: string;
    name: string;
    path: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    provider: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try {
        destroyCookie(undefined, "@nextauth.token");
        Router.push("/");
    } catch (error) {
        console.log("Erro ao deslogar");
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(() => {
        const { "@nextauth.token": token } = parseCookies();

        if (token) {

            api.get("/me").then(response => {
                const { id, name, email, avatar } = response.data;

                // console.log(response)

                setUser({
                    id,
                    name,
                    email,
                    avatar
                });
            })
                .catch(() => {
                    signOut();
                });
        }
    }, []);

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post("/session", {
                email,
                password
            })

            const { id, name, token, avatar } = response.data;

            setCookie(undefined, "@nextauth.token", token, {
                maxAge: 60 * 60 * 24 * 30, //Expira em 1 mês
                path: "/" //todos os caminhos terão acesso ao cookie
            })

            setUser({
                id,
                name,
                email,
                avatar
            });

            api.defaults.headers["Authorization"] = `Bearer ${token}`;

            toast.success("Logado com sucesso!");

            Router.push("/dashboard");
        } catch (error) {
            toast.error("Erro ao logar");
            console.log("Erro ao acessar", error);
        }
    }

    async function signUp({ name, email, provider, password }: SignUpProps) {
        try {
            const response = await api.post("/users", {
                name,
                email,
                provider,
                password_hash: password
            });

            toast.success("Cadastro realizado com sucesso!");

            Router.push("/");
        } catch (error) {
            toast.error("Erro ao cadastrar");
            console.log("Erro ao cadastrar", error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}