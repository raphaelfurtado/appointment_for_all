import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Provider from "../dash/provider";
import Admin from "../dash/admin";
import User from "../dash/user";
import Layout from "../layout";
import { useRouter } from "next/router";

function Dashboard() {

    const router = useRouter();
    const { user } = useContext(AuthContext);


    type UserProfile = {
        provider: string;
    };

    type ContainerProfileProps = {
        user: UserProfile | undefined;
    };

    const ContainerProfile: React.FC<ContainerProfileProps> = ({ user }) => {
        if (user?.provider === "provider") {
            router.push('/dash/provider');
        } else if (user?.provider === "admin") {
            router.push('/dash/admin');
            //return <Admin />;
        } else if (user?.provider === "user"){
            router.push('/dash/user');
        } else {
            return "-";
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

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})