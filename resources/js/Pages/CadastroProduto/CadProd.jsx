import React, { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayoutAll";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { InputTextarea } from "primereact/inputtextarea";
import CadFilial from "../CadastroFilial/CadFilial";
import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
import { getEstabelecimentoById } from "../../../../SERVICESSAPORRA/estabelecimentoService";

export default function CadastroProduto({ auth }) {
    const [allProdutoData, setAllProdutoData] = useState();
    const [controlVal, setControlVal] = useState(false);

    // useEffect(() => {
    //     getProdutoById(auth.user.id).then((res) => {
    //         if (res.data != {}) {
    //             setAllProdutoData(res.data);
    //         }
    //     });
    // }, [controlVal]);

    // const [isModalOpen, setIsModalOpe    n] = useState(false);

    // const openModal = () => {
    //     setIsModalOpen(true);
    // const closeModal = () => {
    //     setIsModalOpen(false);
    // }

    // console.log(auth);

    const { data, setData, post, processing, errors, reset } = useForm({
        nome_produto: "",
        valor: "",
        descricao: "",
        peso: "",
        tamanho: "",
        material: "",
        categoria: "",
        fornecedor_id: "",
        // estabelecimento_id:,
    });

    useEffect(() => {}, []);

    const onSubmit = async (e) => {
        //     e.preventDefault();
        //     try {
        //         const requestData = {
        //             nome_produto: data.nome_produto,
        //             valor: data.valor,
        //             descricao: data.descricao,
        //             peso: data.peso,
        //             tamanho: data.tamanho,
        //             material: data.material,
        //             categoria: data.categoria,
        //             fornecedor: data.fornecedor,
        //             user_id: auth.user.id,
        //         };
        //         console.log(requestData);
        //         const response = await axios.post("/b/produto", requestData);
        //         if (response.status === 201) {
        //             console.error("Deu certo:", response);
        //         } else {
        //             if (response.status === 442) {
        //                 console.error("Erro de validação: ", response.data.errors);
        //             } else {
        //                 console.error(
        //                     "Erro ao cadastrar produto e endereço:",
        //                     response.data.error
        //                 );
        //             }
        //         }
        //         setControlVal((controlVal) => !controlVal);
        //         reset();
        //     } catch (error) {
        //         console.error("Erro ao cadastrar produto:", error);
        //     }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Cadastro Produto
                </h2>
            }
        >
            <Head title="Cadastro Produto" />

            {/* {
                <h1 style={{ color: "black" }}>
                    {JSON.stringify(allProdutoData)}
                </h1>
            } */}

            {!allProdutoData && (
                <div className="py-12">
                    <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 flex justify-content-center align-itens-center">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                            <GuestLayout>
                                <form
                                    onSubmit={onSubmit}
                                    action="/b/produto"
                                    method="POST"
                                    className="p-4"
                                >
                                    <div className="flex flex-row justify-content-center bg-white">
                                        <TextInput
                                            id="nome_produto"
                                            type="text"
                                            name="nome_produto"
                                            value={data.nome_produto}
                                            className="p-invalid text-50 bg-white w-full mb-3 mr-3"
                                            isFocused={true}
                                            placeholder="Nome Produto"
                                            onChange={(e) =>
                                                setData(
                                                    "nome_produto",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.nome_produto}
                                            className="mt-2"
                                        />

                                        <TextInput
                                            id="valor"
                                            type="text"
                                            name="valor"
                                            value={data.valor}
                                            className="p-invalid text-50 bg-white w-5 mb-3 "
                                            placeholder="Valor"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("valor", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.valor}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex flex-column align-items-center bg-white">
                                        <InputTextarea
                                            id="descricao"
                                            type="text"
                                            name="descricao"
                                            value={data.descricao}
                                            className="autoResize border-gray-300 text-50 bg-white h-6rem mb-3 w-full"
                                            autoComplete="descricao"
                                            placeholder="Descrição"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "descricao",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.descricao}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex flex-row justify-content-between bg-white w-full">
                                        <TextInput
                                            id="peso"
                                            type="text"
                                            name="peso"
                                            value={data.peso}
                                            className="flex align-items-center justify-content-center p-invalid text-50 bg-white mb-3 mr-4 w-3"
                                            autoComplete="current-password"
                                            placeholder="Peso(opcional)"
                                            onChange={(e) =>
                                                setData("peso", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.peso}
                                            className="mt-2"
                                        />

                                        <TextInput
                                            id="tamanho"
                                            type="text"
                                            name="tamanho"
                                            value={data.tamanho}
                                            className="flex align-items-center justify-content-center p-invalid text-50 bg-white mb-3 mr-4 w-3"
                                            placeholder="Tamanho(opcional)"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "tamanho",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.tamanho}
                                            className="mt-2"
                                        />

                                        <TextInput
                                            id="material"
                                            type="text"
                                            name="material"
                                            value={data.material}
                                            className=" flex align-items-center justify-content-centerp-invalid text-50 bg-white mb-3 w-3"
                                            placeholder="Material(opcional)"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "material",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.material}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex flex-column align-items-center bg-white">
                                        <TextInput
                                            id="categoria"
                                            type="text"
                                            name="categoria"
                                            value={data.categoria}
                                            className="p-invalid text-50 bg-white  mb-3 mr-3 ml-3 w-full"
                                            placeholder="Categoria"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "categoria",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.categoria}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex flex-column align-items-center bg-white">
                                        <TextInput
                                            id="fornecedor"
                                            type="text"
                                            name="fornecedor"
                                            value={data.fornecedor}
                                            className="p-invalid text-50 bg-white mb-3 mr-3 ml-3 w-full"
                                            placeholder="Fornecedor"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "fornecedor",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.fornecedor}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex items-center justify-content-between mt-4 flex-col">
                                        <PrimaryButton
                                            className="ml-4"
                                            disabled={processing}
                                        >
                                            Cadastrar
                                        </PrimaryButton>
                                        {/* <PrimaryButton onClick={openModal}>Cadastra Filial</PrimaryButton> */}
                                    </div>
                                </form>

                                {/* <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                                    <div className="p-4">
                                        <CadFilial />
                                        <button style={{ background: 'red' }} onClick={closeModal}>Fechar Modal</button>
                                    </div>
                                </Modal> */}
                            </GuestLayout>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
