import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Header from "../header";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import styles from "./styles.module.scss";

function Profile() {
    return (
        <>
            <Head>
                <title>Meu perfil - Appointment</title>
            </Head>
            <Header />

            <div className={styles.containerCenter}>
                <div className={styles.form}>
                    <form>
                        <Input type="text" placeholder="Nome completo" />
                        <Input type="email" placeholder="E-mail" />

                        <hr />

                        <Input type="password" placeholder="Sua senha atual" />
                        <Input type="password" placeholder="Nova senha" />
                        <Input type="password" placeholder="Confirmação de senha" />

                        <Button
                            type="submit"
                        >
                            Atualizar perfil
                        </Button>

                    </form>
                </div>
            </div>
        </>
    );
}

export default Profile;

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})