import Head from "next/head";
import styles from "../../styles/Home.module.scss";
import logoImg from "../../public/vercel.svg";
import Image from "next/image";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>Agendamento - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo barber" />

        <div className={styles.login}>
          <form action="">
            <Input
              type="text"
              placeholder="Digite seu e-mail"
            />
            <Input
              type="password"
              placeholder="Digite sua senha"
            />
            <Button 
              type="submit"
              loading={false}
            >
              Acessar
            </Button>
          </form>

          <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
        </div>
      </div>
    </>
  )
}
