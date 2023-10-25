import React, { ReactNode, useState } from "react";
import Sidebar from "./sidebar";
import { Header } from "./Header";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <main className='w-full bg-gray-100 min-h-screen'>
                <Header />
                {children}
            </main>
        </div>
    );
};

