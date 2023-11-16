import Head from "next/head";
import { FormEvent, useState, useContext, useEffect } from "react";
import Layout from "../layout";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { api } from "../../services/apiClient";

interface Category {
    id: number;
    name: string;
    description: string;
}


export default function Category() {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.get(`/categories?search=${searchTerm}`);

            if (response.status !== 200) {
                throw new Error(`Erro ao obter categorias: ${response.status} - ${response.statusText}`);
            }

            const data = await response.data;
            setCategories(data);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error(String(error));
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await api.get("/categories");

                if (response.status !== 200) {
                    throw new Error(`Erro ao obter categorias: ${response.status} - ${response.statusText}`);
                }

                const data = await response.data;
                setCategories(data);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                } else {
                    console.error(String(error));
                }
            }
        };


        fetchData();
    }, [apiUrl]);

    return (
        <>
            <Head>
                <title>Categoria - Appointment</title>
            </Head>

            <Layout>
                <div className="p-4">
                    <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
                        <div className="my-3 p-2 md:grid-cols-4 sm-grid-cols-3 grid-cols-2 items-center justify-between">

                            <div className="bg-white border rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">Pesquisar categoria</h2>
                                <form onSubmit={handleSearchSubmit}>
                                    <div className="mb-2">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Nome:
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            className="mt-1 p-2 w-full border rounded-md"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                    >
                                        Pesquisar
                                    </button>

                                </form>
                            </div>

                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                #ID
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Nome
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Descrição
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((category) => (
                                            <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {category.id}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {category.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {category.description}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>
            </Layout>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})