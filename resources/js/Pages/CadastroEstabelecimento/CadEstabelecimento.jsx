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
import { Toast } from "primereact/toast";
import axios from "axios";
import {
    atualizarEstabelecimentoById,
    getEstabelecimentoById,
} from "../../../../SERVICES/estabelecimentoService";
import { deleteEstabelecimentoById } from "../../../../SERVICES/estabelecimentoService";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import { Badge } from "primereact/badge";

export default function CadastroEstabelecimento({ auth }) {
    const [allEstabelecimentoData, setAllEstabelecimentoData] = useState();
    const [controlVal, setControlVal] = useState(false);
    const [editar, setEditar] = useState(false);
    const [editadaData, setEditadaData] = useState({});
    const [razaoSocial, setRazaoSocial] = useState(
        allEstabelecimentoData?.razao_social || ""
    );
    const [nomeFantasia, setNomeFantasia] = useState(
        allEstabelecimentoData?.nome_fantasia || ""
    );
    const [telefone, setTelefone] = useState(
        allEstabelecimentoData?.telefone || ""
    );
    const [cnpj, setCnpj] = useState(allEstabelecimentoData?.cnpj || "");
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        getEstabelecimentoById(auth.user.id)
            .then((res) => {
                if (res.data != {}) {
                    setAllEstabelecimentoData(res.data);
                    setEditadaData(res.data);
                    setLoadingData(false);
                }
            })
            .catch(() => {
                setAllEstabelecimentoData(null);
                setLoadingData(false);
            });
    }, [controlVal]);

    const editarClick = () => {
        setEditar(true);
    };

    const salvarEdit = () => {
        console.log("Clicou em Salvar!");
        if (allEstabelecimentoData && allEstabelecimentoData.id) {
            atualizarEstabelecimentoById(allEstabelecimentoData.id, editadaData)
                .then((data) => {
                    setEditar(false);
                    setAllEstabelecimentoData(data);
                })
                .catch((error) => {
                    console.error("Erro ao atualizar estabelecimento:", error);
                });
        } else {
            console.error(
                "ID do estabelecimento indefinido. Os dados podem não ter sido carregados corretamente."
            );
        }
    };

    const onDelete = async (estabelecimentoData) => {
        try {
            await deleteEstabelecimentoById(estabelecimentoData.id);
            window.location.reload();
        } catch (error) {
            console.log("Erro", error);
        }
    };

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

    const caseHaveEstabelecimento = () => {
        if (allEstabelecimentoData) {
            return (
                <div className="py-12 w-full h-full">
                    <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 flex justify-content-center align-itens-center ">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full h-full p-8">
                            <div className="flex justify-content-center mb-5">
                                <div className="flex justify-content-center">
                                    <Avatar
                                        label={auth.user.name
                                            .substr(0, 1)
                                            .toUpperCase()}
                                        className="mr-2"
                                        size="xlarge"
                                        shape="circle"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-content-center gap-4 mb-4">
                                <div className=" w-12rem flex flex-column gap-2">
                                    <label htmlFor="razao_social">
                                        Razão Social
                                    </label>
                                    <InputText
                                        disabled={!editar}
                                        onChange={(e) =>
                                            setEditadaData({
                                                ...editadaData,
                                                razao_social: e.target.value,
                                            })
                                        }
                                        value={editadaData?.razao_social}
                                    />
                                </div>
                                <div className="w-12rem flex flex-column gap-2">
                                    <label htmlFor="nome_fantasia">
                                        Nome Fantasia
                                    </label>
                                    <InputText
                                        disabled={!editar}
                                        onChange={(e) =>
                                            setEditadaData({
                                                ...editadaData,
                                                nome_fantasia: e.target.value,
                                            })
                                        }
                                        value={editadaData?.nome_fantasia}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-content-center gap-4">
                                <div className="w-12rem flex flex-column gap-2">
                                    <label htmlFor="telefone">Telefone</label>
                                    <InputText
                                        disabled={!editar}
                                        onChange={(e) =>
                                            setEditadaData({
                                                ...editadaData,
                                                telefone: e.target.value,
                                            })
                                        }
                                        value={editadaData?.telefone}
                                    />
                                </div>
                                <div className="flex w-12rem flex-column gap-2">
                                    <label htmlFor="cnpj">CNPJ</label>
                                    <InputText
                                        disabled={!editar}
                                        onChange={(e) =>
                                            setEditadaData({
                                                ...editadaData,
                                                cnpj: e.target.value,
                                            })
                                        }
                                        value={editadaData?.cnpj}
                                    />
                                </div>
                            </div>
                            <div className=" flex justify-content-center mt-5">
                                {editar ? (
                                    <div>
                                        <Button
                                            className="w-12rem flex justify-content-center mr-4"
                                            label="Salvar"
                                            icon="pi pi-check"
                                            outlined
                                            onClick={salvarEdit}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <Button
                                            className="w-12rem flex justify-content-center mr-4"
                                            label="Editar"
                                            icon="pi pi-pencil"
                                            outlined
                                            onClick={editarClick}
                                        />
                                    </div>
                                )}
                                <div>
                                    <Button
                                        label="Excluir"
                                        className="w-12rem flex justify-content-center"
                                        icon="pi pi-check"
                                        severity="danger"
                                        onClick={() => {
                                            onDelete(allEstabelecimentoData);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

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
        // ToastDeuCerto()
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
                    {!allEstabelecimentoData
                        ? "Cadastro Estabelecimento"
                        : "Meu Estabelecimento"}
                </h2>
            }
        >
            <Head title="Cadastro Estabelecimento" />

            {allEstabelecimentoData === null ? (
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
                                                className="p-invalid text-800 bg-white mb-3 mr-3 ml-3 w-full"
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
                                                className="p-invalid text-800 bg-white  mb-3 mr-3 ml-3 w-12"
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
                                                className="p-invalid text-800 bg-white  mb-3 mr-3 w-12"
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
                                                className="p-invalid text-800 bg-white  mb-3 ml-3 w-12"
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
                                                className="p-invalid text-800 bg-white  mb-3 mr-3 ml-3 w-12"
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
                                                className="p-invalid text-800 bg-white  mb-3 mr-3 w-12"
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
                                                className="p-invalid text-800 bg-white  mb-3 ml-3 w-12"
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
                                                className="p-invalid text-800 bg-white  mb-3 mr-3 ml-3 w-12"
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
            ) : (
                caseHaveEstabelecimento()
            )}
        </AuthenticatedLayout>
    );
}
