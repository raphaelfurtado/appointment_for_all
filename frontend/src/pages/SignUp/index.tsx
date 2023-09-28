import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Home.module.scss";
import logoImg from "../../../public/vercel.svg";
import Image from "next/image";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { FormEvent, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function SignUp() {

    const { signUp } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        if (name === "" || email === "" || password === "") {
            alert("Preencha todos os campos");
            return;
        }

        setLoading(true);

        let data = {
            name,
            email,
            provider: "user",
            password
        }

        await signUp(data);

        setLoading(false);
    }

    return (
        <>
            <Head>
                <title>Agendamento - Faça seu cadastro</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo barber" />

                <div className={styles.login}>
                    <h1 className={styles.text}>Crie sua conta</h1>
                    <form onSubmit={handleSignUp}>
                        <Input
                            type="text"
                            placeholder="Digite seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            type="text"
                            placeholder="Seu e-mail. Ex.: seuemail@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Cadastrar
                        </Button>
                    </form>
                    <Link href="/" className={styles.text}>
                        Já possui uma conta? Faça login!
                    </Link>
                </div>
            </div>
        </>
    )
}
