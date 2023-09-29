import { useContext } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";
import Image from "next/image";

export function Header() {

    const { signOut, user } = useContext(AuthContext);

    //console.log("http://localhost:3333/files/"+user?.avatar.path)


    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image src="/vercel.svg" width={190} height={60} alt="Logo"/>
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/agendamentos">
                        Agendamentos
                    </Link>
                </nav>

                <aside className={styles.menuAside}>
                    <div>
                        <strong>{user?.name}</strong>

                        <Link href="/profile">Meu perfil</Link>

                        <a onClick={signOut}>
                            {/* <FiLogOut color="#FFF" size={24} /> */}
                            Sair
                        </a>
                    </div>

                    <img className={styles.avatar}
                        src={`http://localhost:3333/files/${user?.avatar.path}`}
                        alt="Foto do perfil"
                    />
                </aside>

            </div>
        </header>
    );
}

export default Header;