import Head from "next/head";
import { FormEvent, useState, useContext, useEffect } from "react";
import Layout from "../layout";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { api } from "../../services/apiClient";
import Modal from "../../components/ui/Modal";
import ButtonForm from "../../components/ui/ButtonForm";
import { toast } from "react-toastify";
import InputForm from "../../components/ui/InputForm";
import MenuIcon from "../../components/ui/MenuIcon";
import Indicators from "../../components/ui/Indicators";
import Checkbox from "../../components/ui/CheckBox";

interface Category {
    id: number;
    name: string;
    description: string;
    active: boolean;
}


export default function Category() {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<Category>();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalOpenEdit, setModalOpenEdit] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [checkboxValue, setCheckboxValue] = useState(false);
    const dropdownItems = ['Editar'];


    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const openModalEdit = () => setModalOpenEdit(true);
    const closeModalEdit = () => setModalOpenEdit(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSaveSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post(`/category`, {
                name: categoryName,
                active: checkboxValue
            });

            if (response.status !== 200) {
                toast.error("Erro ao cadastrar categoria!");
            }

            handleSearchSubmit(e);

            toast.success("Registro salvo com sucesso!");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(String(error));
            }
        }

        setCategoryName('');
        closeModal();
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.put(`/category/update/${category?.id}`, {
                name: category?.name,
                active: checkboxValue
            });

            if (response.status !== 200) {
                toast.error("Erro ao cadastrar categoria!");
            }

            handleSearchSubmit(e);

            toast.success("Registro alterado com sucesso!");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(String(error));
            }
        }

        closeModalEdit();
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

    const handleMenuClick = async (item: string, categoryId: number) => {
        switch (item) {
            case 'Editar':
                try {
                    const response = await api.get(`/categoryById?id=${categoryId}`);
                    if (response.status !== 200) {
                        throw new Error(`Erro ao obter categorias: ${response.status} - ${response.statusText}`);
                    }

                    const data = await response.data;

                    setCategory(data);

                    openModalEdit();

                } catch (error) {
                    if (error instanceof Error) {
                        console.error(error.message);
                    } else {
                        console.error(String(error));
                    }
                }

                break;
            case 'Excluir':
                // Lógica para excluir a categoria
                alert(`Excluir categoria com ID ${categoryId}`);
                break;
            default:
                // Ação padrão ou qualquer outra ação que você queira adicionar
                break;
        }
    };

    const handleCheckboxChange = (value: boolean) => {
        setCheckboxValue(value);
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
                                        />
                                    </div>


                                    <div className="flex items-center  border-gray-200 rounded-b dark:border-gray-600">
                                        <ButtonForm type="submit">Pesquisar</ButtonForm>
                                        <ButtonForm onClick={openModal} category="green">
                                            Adicionar
                                        </ButtonForm>
                                    </div>

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
                                                Situação
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Ações
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
                                                    <Indicators active={category.active} />
                                                </td>
                                                <td>
                                                    <MenuIcon
                                                        items={dropdownItems}
                                                        onItemClick={(item) => handleMenuClick(item, category.id)}
                                                    />
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

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="p-1 md:p-1 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Criar nova categoria
                    </h3>
                </div>

                <form onSubmit={handleSaveSubmit} className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <InputForm
                                placeholder="Nome da categoria"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <Checkbox active={true} onChange={handleCheckboxChange}/>
                        </div>
                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <ButtonForm
                            type="submit"
                        >
                            Salvar
                        </ButtonForm>
                        <ButtonForm category="light" onClick={closeModal}>Cancelar</ButtonForm>
                    </div>
                </form>
            </Modal>

            {category && <Modal isOpen={isModalOpenEdit} onClose={closeModalEdit}>
                <div className="p-1 md:p-1 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Editar categoria
                    </h3>
                </div>

                <form onSubmit={handleEditSubmit} className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <InputForm
                                placeholder="Nome da categoria"
                                value={category.name}
                                onChange={(e) => setCategory({ ...category, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <Checkbox active={category.active} onChange={handleCheckboxChange}/>
                        </div>
                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <ButtonForm
                            type="submit"
                        >
                            Salvar
                        </ButtonForm>
                        <ButtonForm category="light" onClick={closeModalEdit}>Cancelar</ButtonForm>
                    </div>
                </form>
            </Modal>}

        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})