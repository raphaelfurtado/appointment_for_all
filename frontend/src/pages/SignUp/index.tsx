import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Home.module.scss";
import logoImg from "../../../public/vercel.svg";
import Image from "next/image";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function SignUp() {
    return (
        <>
            <Head>
                <title>Agendamento - Faça seu cadastro</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo barber" />

                <div className={styles.login}>
                    <h1 className={styles.text}>Crie sua conta</h1>
                    <form action="">
                        <Input
                            type="text"
                            placeholder="Digite seu nome"
                        />

                        <Input
                            type="text"
                            placeholder="Seu e-mail. Ex.: seuemail@gmail.com"
                        />

                        <Input
                            type="text"
                            placeholder="Digite seu telefone. Ex.: (99)99999-9999"
                        />

                        <Input
                            type="password"
                            placeholder="Digite sua senha"
                        />
                        <Button
                            type="submit"
                            loading={false}
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
