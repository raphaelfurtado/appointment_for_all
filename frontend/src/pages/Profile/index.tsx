import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Header from "../header";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import styles from "./styles.module.scss";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { setupAPIClient } from "../../services/api";

function Profile() {

    const { user } = useContext(AuthContext);
    const apiClient = setupAPIClient();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    useEffect(() => {
        if (!name && user) {
            setName(user.name);
        }
        if (!email && user) {
            setEmail(user.email);
        }
    }, [name, user, email])

    async function handleUpdate(event: FormEvent) {
        event.preventDefault();

        let userUpdated = {
            name: name,
            email: email,
            oldPassword: oldPassword,
            // password: "123456",
            // confirmPassword: "123456",
            avatar_id: null
        }

        // console.log(userUpdated);

        const response = await apiClient.put("/update", userUpdated);

        console.log(response);
    }

    return (
        <>
            <Head>
                <title>Meu perfil - Appointment</title>
            </Head>
            <Header />

            <div className={styles.containerCenter}>
                <div className={styles.form}>
                    <form onSubmit={handleUpdate}>
                        <Input
                            type="text"
                            placeholder="Nome completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <hr />

                        <Input
                            type="password"
                            placeholder="Sua senha atual"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        {/* <Input
                            type="password"
                            placeholder="Nova senha"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Confirmação de senha"
                            value={confirmPassword}
                            onChange={(e) => setconfirmPassword(e.target.value)}
                        /> */}

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