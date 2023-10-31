import React from 'react';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Header() {

    const { signOut, user } = useContext(AuthContext);

    //const apiUrl = process.env.API_URL || 'http://localhost:3333';

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    return (
        <div className="flex justify-between px-4 pt-4">
            <h2>Appointment</h2>
            {user?.name && (
                <>

                    <span
                        style={{ backgroundImage: `url('${apiUrl}/files/${user?.avatar === null ? 'avatar.webp' : user?.avatar.path}')` }}
                    />

                    <span>
                        <h2>Bem vindo(a), <strong>{user.name}</strong>!</h2>
                    </span>
                    <br />
                    <button onClick={signOut}>
                        {/* <FiLogOut color="#FFF" size={24} /> */}
                        Sair
                    </button>
                </>
            )}

        </div>
    );
}

export default Header;