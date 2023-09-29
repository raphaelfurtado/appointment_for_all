import { canSSRAuth } from "../../utils/canSSRAuth";

function Dashboard() {
    return (<>
        <h1>Dashboard</h1>
    </>);
}

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})