import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Header from "../header";

function Dashboard() {
    return (
        <>
            <Head>
                <title>Painel - Appointment</title>
            </Head>
            <div>
                <Header />
                <h1>Painel</h1>
            </div>
        </>
    );
}

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})