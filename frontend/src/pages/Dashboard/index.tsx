import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Header from "../header";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import styles from "./styles.module.scss";
import Time from "../../components/ui/Time";

function Dashboard() {
    return (
        <>
            <Head>
                <title>Painel - Appointment</title>
            </Head>
            <div>
                <Header />
                <div className={styles.container}>
                    <div>
                        <button type="button">
                            <MdChevronLeft size={36} color="#FFF" />
                        </button>
                        <strong>31 de Maio</strong>
                        <button type="button">
                            <MdChevronRight size={36} color="#FFF" />
                        </button>
                    </div>
                </div>
                <div className={styles.containerTimer}>
                    <ul>
                        <Time
                            hour="08:00"
                            calaborator="Raphael Furtado"
                            status="past"
                        />
                        <Time
                            hour="09:00"
                            calaborator="Em aberto"
                            status="available"
                        />
                        <Time
                            hour="10:00"
                            calaborator="Raphael Furtado"
                            status=""
                        />
                        <Time
                            hour="11:00"
                            calaborator="Raphael Furtado"
                            status=""
                        />
                    </ul>
                </div>
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