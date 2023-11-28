import React, { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayoutAll";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import CadFilial from "../CadastroFilial/CadFilial";
import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
import { getEstabelecimentoById } from "../../../../SERVICESSAPORRA/estabelecimentoService";

export default function CadastroEstabelecimento({ auth }) {
    const [allEstabelecimentoData, setAllEstabelecimentoData] = useState();
    const [controlVal, setControlVal] = useState(false);

    useEffect(() => {
        getEstabelecimentoById(auth.user.id).then((res) => {
            if (res.data != {}) {
                setAllEstabelecimentoData(res.data);
            }
        });
    }, [controlVal]);

    const { data, setData, post, processing, errors, reset } = useForm({
        razao_social: "",
        nome_fantasia: "",
        cnpj: "",
        telefone: "",
        bairro: "",
        cep: "",
        cidade: "",
        estado: "",
    });

    useEffect(() => {}, []);

    const onSubmit = async (e) => {
        // e.preventDefault();
        // try {
        //     const requestData = {
        //         razao_social: data.razao_social,
        //         nome_fantasia: data.nome_fantasia,
        //         cnpj: data.cnpj,
        //         telefone: data.telefone,
        //         bairro: data.bairro,
        //         cep: data.cep,
        //         cidade: data.cidade,
        //         estado: data.estado,
        //         user_id: auth.user.id,
        //     };
        // const response = await axios.post('/a/estabelecimento', requestData);
        // if (response.status === 201) {
        //     console.error('Deu certo:', response);
        // } else {
        //     if (response.status === 442) {
        //         console.error('Erro de validação: ', response.data.errors);
        //     } else {
        //         console.error('Erro ao cadastrar estabelecimento e endereço:', response.data.error);
        //     }
        // }
        //     setControlVal(controlVal => !controlVal)
        //     reset();
        // } catch (error) {
        //     console.error('Erro ao cadastrar estabelecimento:', error);
        // }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Cadastro Estabelecimento
                </h2>
            }
        >
            <Head title="Cadastro Estabelecimento" />

            {
                <h1 style={{ color: "black" }}>
                    {JSON.stringify(allEstabelecimentoData)}
                </h1>
            }

            {!allEstabelecimentoData && (
                <div className="py-12">
                    <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 flex justify-content-center align-itens-center">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <GuestLayout>
                                <form
                                    onSubmit={onSubmit}
                                    action="a/estabelecimento"
                                    method="POST"
                                    className="p-4"
                                >
                                    <div className="flex flex-column align-items-center bg-white">
                                        <div
                                            className="flex flex-column align-items-center bg-white w-full"
                                            about="razao_social"
                                        >
                                            <TextInput
                                                id="razao_social"
                                                placeholder="Razão Social"
                                                type="text"
                                                name="razao_social"
                                                value={data.razao_social}
                                                className="p-invalid text-50 bg-white mb-3 mr-3 ml-3 w-full"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "razao_social",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.razao_social}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div
                                            about="nome_fantasia"
                                            className="flex flex-column align-items-center bg-white w-full"
                                        >
                                            <TextInput
                                                id="nome_fantasia"
                                                type="text"
                                                name="nome_fantasia"
                                                placeholder="Nome Fantasia"
                                                value={data.nome_fantasia}
                                                className="p-invalid text-50 bg-white  mb-3 mr-3 ml-3 w-12"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "nome_fantasia",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.nome_fantasia}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div
                                            about="cnpj and telefone"
                                            className="flex flex-row justify-content-between bg-white"
                                        >
                                            <TextInput
                                                id="telefone"
                                                placeholder="Telefone"
                                                type="text"
                                                name="telefone"
                                                value={data.telefone}
                                                className="p-invalid text-50 bg-white  mb-3 mr-3 w-12"
                                                autoComplete="current-password"
                                                onChange={(e) =>
                                                    setData(
                                                        "telefone",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.telefone}
                                                className="mt-2"
                                            />

                                            <TextInput
                                                id="cnpj"
                                                type="text"
                                                placeholder="CNPJ"
                                                name="cnpj"
                                                value={data.cnpj}
                                                className="p-invalid text-50 bg-white  mb-3 ml-3 w-12"
                                                autoComplete="cnpj"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "cnpj",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.cnpj}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div
                                            className="flex flex-column align-items-center bg-white w-full"
                                            about="cidade"
                                        >
                                            <TextInput
                                                id="cidade"
                                                placeholder="Cidade"
                                                type="text"
                                                name="cidade"
                                                value={data.cidade}
                                                className="p-invalid text-50 bg-white  mb-3 mr-3 ml-3 w-12"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "cidade",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.cidade}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div
                                            about="cep and estado"
                                            className="flex flex-row justify-content-between bg-white"
                                        >
                                            <TextInput
                                                id="cep"
                                                placeholder="CEP"
                                                type="text"
                                                name="cep"
                                                value={data.cep}
                                                className="p-invalid text-50 bg-white  mb-3 mr-3 w-12"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "cep",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.cep}
                                                className="mt-2"
                                            />

                                            <TextInput
                                                id="estado"
                                                type="text"
                                                placeholder="Estado"
                                                name="estado"
                                                value={data.estado}
                                                className="p-invalid text-50 bg-white  mb-3 ml-3 w-12"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "estado",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.estado}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div
                                            className="flex flex-column align-items-center bg-white w-full"
                                            about="Bairro"
                                        >
                                            <TextInput
                                                id="bairro"
                                                placeholder="Bairro"
                                                type="text"
                                                name="bairro"
                                                value={data.bairro}
                                                className="p-invalid text-50 bg-white  mb-3 mr-3 ml-3 w-12"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "bairro",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.bairro}
                                                className="mt-2"
                                            />
                                        </div>
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
