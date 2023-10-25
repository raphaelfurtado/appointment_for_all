
import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Provider from "../../components/ui/Profile/provider";
import Admin from "../../components/ui/Profile/admin";
import User from "../../components/ui/Profile/user";
import Layout from "../layout";

function MyAppointments() {

    const { user } = useContext(AuthContext);

    type UserProfile = {
        provider: string;
    };

    type ContainerProfileProps = {
        user: UserProfile | undefined;
    };

    const ContainerProfile: React.FC<ContainerProfileProps> = ({ user }) => {
        if (user?.provider === "provider") {
            return <Provider />;
        } else if (user?.provider === "admin") {
            return <Admin />;
        } else {
            return <User />;
        }
    };

    return (
        <>
            <Head>
                <title>Painel - Appointment</title>
            </Head>

            <Layout>
                <ContainerProfile user={user} />
            </Layout>
        </>
    );
}

export default MyAppointments;

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})