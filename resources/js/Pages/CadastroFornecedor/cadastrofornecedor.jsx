import React, { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayoutAll";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import CadEstabelecimento from "../CadastroEstabelecimento/CadEstabelecimento";
import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
import { Toast } from "primereact/toast";
import { getEstabelecimentoById } from "../../../../SERVICES/estabelecimentoService";
import { NaoTemEstabelecimento } from "@/0PersoComponents/naoTemEstabelecimento";
import { Validar } from "@/validations"
import { InputMask } from "primereact/inputmask";
import TableCadastroFornecedor from "./TableCadastroFornecedor";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export default function CadastroFornecedor({ auth }) {


    const [hasEstabelecimento, setHasEstabelecimento] = useState()
    const [visible, setVisible] = useState()
    const [goFetch, setGoFetch] = useState(false)

    const { data, setData, post, processing, errors, reset } = useForm({
        razao_social: "",
        telefone: "",
        cnpj: "",
        web_site: "",
        cep: "",
        cidade: "",
        estado: "",
        bairro: "",
        marca: "",
        email: "",
    });



    const ToastDeuCerto = () => {
        toast.current.show({
            severity: "success",
            summary: "Adicionado com Sucesso",
            detail: "Fornecedor adicionado com sucesso",
        });
    };

    useEffect(() => {

        getEstabelecimentoById(auth.user.id).then((res) => {
            if (res.data != {}) {
                setData({ ...data, estabelecimento_id: res.data.id });
                setHasEstabelecimento(res.data)
            }
        }).catch(() => {
            setHasEstabelecimento(null)
        });


    }, []);
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const requestData = {
                razao_social: data.razao_social,
                telefone: data.telefone,
                cnpj: data.cnpj,
                web_site: data.web_site,
                bairro: data.bairro,
                cep: data.cep,
                cidade: data.cidade,
                estado: data.estado,
                marca: data.marca,
                email: data.email,
                user_id: auth.user.id,
            };

            const response = await axios.post("/c/fornecedor", requestData);
            if (response.status === 201) {
                setGoFetch(prev => !prev)
                toast.success("Cadastrado com sucesso")
                console.error("Deu certo:", response);
            } else {
                setGoFetch(prev => !prev)
                console.error(
                    "Erro ao cadastrar Fornecedor e endereço:",
                    error
                );
            }
        } catch (error) {
            setGoFetch(prev => !prev)
            console.error("Erro ao cadastrar Fornecedor:", error, response);
        }
    };

    const FormularioFornecedor = () => {

        if(hasEstabelecimento){
               return(
        <div className=" pt-6 w-full flex flex-column align-items-center ">
        <div className="w-11 bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 ">
                <Dialog header="Cadastrar Produto" visible={visible} draggable={false} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <div className="">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <GuestLayout>
                        <form onSubmit={onSubmit} className="p-4">
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
                                        className="text-50 bg-white mb-3 mr-3 ml-3 w-full"
                                        isfocused="true"
                                        onChange={(e) =>
                                            setData(
                                                "razao_social",
                                                Validar.StringWithSpecialChars(e.target.value)
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.razao_social}
                                        className="mt-2"
                                    />
                                </div>

                                <div
                                    className="flex flex-column align-items-center bg-white w-full"
                                    about="marca"
                                >
                                    <TextInput
                                        id="marca"
                                        type="text"
                                        name="marca"
                                        placeholder="Marca"
                                        value={data.marca}
                                        className=" text-50 bg-white mb-3 mr-3 ml-3 w-full"
                                        isfocused="true"
                                        onChange={(e) =>
                                            setData("marca", Validar.StringWithSpecialChars(e.target.value))
                                        }
                                    />
                                    <InputError
                                        message={errors.marca}
                                        className="mt-2"
                                    />
                                </div>

                                <div
                                    about="telefone and cnpj"
                                    className="flex flex-row justify-content-between bg-white w-full"
                                >
                                    <InputMask
                                        id="telefone"
                                        placeholder="Telefone"
                                        type="text"
                                        name="telefone"
                                        mask="(99) 99999-9999"
                                        value={data.telefone}
                                        maxLength={15}
                                        className="text-50 bg-white  mb-3 mr-3 w-12"
                                        isfocused="true"
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

                                    <InputMask
                                        id="cnpj"
                                        placeholder="CNPJ"
                                        type="text"
                                        name="cnpj"
                                        mask="99.999.999/9999-99"
                                        value={data.cnpj}
                                        className="text-50 bg-white  mb-3 ml-3 w-12 cnpj"
                                        autoComplete="cnpj"
                                        maxLength={18}
                                        isfocused="true"
                                        onChange={(e) =>
                                            setData("cnpj", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.cnpj}
                                        className="mt-2"
                                    />
                                </div>

                                <div
                                    about="cidade"
                                    className="flex flex-column align-items-center bg-white w-full"
                                >
                                    <TextInput
                                        id="cidade"
                                        type="text"
                                        name="cidade"
                                        placeholder="Cidade"
                                        value={data.cidade}
                                        className="p-invalid text-50 bg-white  mb-3 mr-3 ml-3 w-12 String"
                                        isfocused="true"
                                        onChange={(e) =>
                                            setData(
                                                "cidade",
                                                Validar.StringNoSpecialChars(e.target.value)
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
                                    className="flex flex-row justify-content-between bg-white w-full"
                                >
                                    <InputMask
                                        id="cep"
                                        type="text"
                                        name="cep"
                                        placeholder="CEP"
                                        value={data.cep}
                                        mask="99999-999"
                                        maxLength={9}
                                        className="text-50 bg-white  mb-3 mr-3 w-12"
                                        isfocused="true"
                                        onChange={(e) =>
                                            setData("cep", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.cep}
                                        className="mt-2"
                                    />

                                    <TextInput
                                        id="estado"
                                        type="text"
                                        name="estado"
                                        placeholder="Estado"
                                        value={data.estado}
                                        maxLength={2}
                                        className="text-50 bg-white  mb-3 ml-3 w-12"
                                        isfocused="true"
                                        onChange={(e) =>
                                            setData(
                                                "estado",
                                                Validar.StringNoSpecialChars(e.target.value)
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.estado}
                                        className="mt-2"
                                    />
                                </div>

                                <div
                                    about="Bairro"
                                    className="flex flex-column align-items-center bg-white w-full"
                                >
                                    <TextInput
                                        id="bairro"
                                        type="text"
                                        placeholder="Bairro"
                                        name="bairro"
                                        value={data.bairro}
                                        className="text-50 bg-white  mb-3 mr-3 ml-3 w-12"
                                        isfocused="true"
                                        onChange={(e) =>
                                            setData(
                                                "bairro",
                                                Validar.StringNoSpecialChars(e.target.value)
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.bairro}
                                        className="mt-2"
                                    />
                                </div>

                                <div
                                    about="web_site"
                                    className="flex flex-column align-items-center bg-white w-full"
                                >
                                    <TextInput
                                        id="web_site"
                                        type="text"
                                        placeholder="Web Site"
                                        name="web_site"
                                        value={data.web_site}
                                        className="p-invalid text-50 bg-white  mb-3 mr-3 ml-3 w-12"
                                        isfocused="true"
                                        onChange={(e) =>
                                            setData(
                                                "web_site",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.web_site}
                                        className="mt-2"
                                    />
                                </div>

                                <div
                                    about="email"
                                    className="flex flex-column align-items-center bg-white w-full"
                                >
                                    <TextInput
                                        id="email"
                                        placeholder="E-mail"
                                        type="text"
                                        name="email"
                                        value={data.email}
                                        className="p-invalid text-50 bg-white  mb-3 mr-3 ml-3 w-12"
                                        isfocused="true"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-content-between mt-4 flex-col">
                                {/* <PrimaryButton
                                    className="ml-4"
                                    disabled={processing}
                                >
                                    Cadastrar
                                </PrimaryButton> */}
                                <Button label="Cadastrar" type="submit" onClick={() => setVisible(false)}/>
                                {/* <PrimaryButton onClick={openModal}>Cadastra Filial</PrimaryButton> */}
                            </div>
                        </form>
                        {/* <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                                <div className="p-4">
                                    <CadEstabelecimento />
                                    <button style={{ background: 'red' }} onClick={closeModal}>Fechar Modal</button>
                                </div>
                            </Modal> */}
                    </GuestLayout>
                </div>
            </div>
            </Dialog>
            <Button className="mb-3" icon="pi pi-plus" label="Adicionar Fornecedor" onClick={() => setVisible(true)}/>
            <TableCadastroFornecedor auth={auth} goFetch={goFetch} canViewButtons={true}/>
            </div>

        </div>)

        }

    }



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Cadastro Fornecedor
                </h2>
            }
        >
            <Head title="Cadastro Fornecedor" />

            {hasEstabelecimento === null ?
            (<NaoTemEstabelecimento nomeTela="Fornecedor"/>)

                : (FormularioFornecedor())
        }

        </AuthenticatedLayout>
    );
}
