import { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.scss";
import logoImg from "../../public/vercel.svg";
import Image from "next/image";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import { canSSRGuest } from "../utils/canSSRGuest";

export default function Home() {

  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      toast.warn("Preencha os dados");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Agendamento - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo barber" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="Digite seu e-mail"
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
              Acessar
            </Button>
          </form>
          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </>
  )
}


export const getServerSideProps = canSSRGuest(async (ctx) => {

  return {
    props: {}
  }
})