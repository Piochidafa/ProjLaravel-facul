import React, { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayoutAll";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { InputTextarea } from "primereact/inputtextarea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { useRef } from "react";
import { getEstabelecimentoById } from "../../../../SERVICES/estabelecimentoService";
import { getAllFornecedor } from "../../../../SERVICES/fornecedorService";
import { Button } from "primereact/button";
import { categoriasDeProdutos } from "./listCategoriaProdutros";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import TableDash from "../Dashboard/TableDashboad";
import { toast } from 'react-toastify';
import { Dialog } from "primereact/dialog";
import { NaoTemEstabelecimento } from "@/0PersoComponents/naoTemEstabelecimento";
import { Validar } from "@/validations"
import { InputMask } from "primereact/inputmask";


export default function CadastroProduto({ auth }) {
    const [dropFornecedores, setDropFornecedores] = useState([]);
    const [hasEstabelecimento, setHasEstabelecimento] = useState();
    const [controlVal, setControlVal] = useState(false);
    const [visible, setVisible] = useState();
    const [goFetch, setGoFetch] = useState(false);



    useEffect(() => {
        getEstabelecimentoById(auth.user.id).then((res) => {
            if (res.data != {}) {
                setData({ ...data, estabelecimento_id: res.data.id });
                setHasEstabelecimento(res.data)
            }
        }).catch(() => {
            setHasEstabelecimento(null)
        });

        getAllFornecedor().then((res) => {
            setDropFornecedores(res);
        });
    }, [controlVal]);

    const { data, setData, post, processing, errors, reset } = useForm({
        nome_produto: "",
        preco: null,
        descricao: "",
        unidade: "",
        peso: "",
        tamanho: "",
        material: "",
        categoria: "",
        fornecedor_id: "",
        estabelecimento_id: "",
    });


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                nome_produto: data.nome_produto,
                preco: data.preco,
                unidade: data.unidade,
                descricao: data.descricao,
                peso: data.peso,
                tamanho: data.tamanho,
                material: data.material,
                categoria: data.categoria,
                fornecedor_id: data.fornecedor_id.id,
                estabelecimento_id: data.estabelecimento_id,
            };
            const response = await axios.post("b/produto", requestData);
            setVisible(false)
            if (response.status === 200) {
                setGoFetch(prev => !prev)
                toast.success("Produto cadastrado com sucesso");
                console.error("Deu certo:", response);
            } else {
                if (response.status === 500) {
                    console.error("Erro de validação: ", response.data.errors);
                } else {
                    console.error(
                        "Erro ao cadastrar produto e endereço:",
                        response.data.error
                    );
                }
            }
            setControlVal((controlVal) => !controlVal);
            reset();
        } catch (error) {
            toast.error("Erro ao cadastrar produto");
            console.error("Erro ao cadastrar produto:", error);
        }
    };



    //-------------------- FORMULARIO DE CADASTRO DE PRODUTO ------------------>

    const FormularioProduto = () => {

        if(hasEstabelecimento){
        return(
            <>
                (
                <div className="pt-6 w-full flex flex-column align-items-center">

                <Dialog header="Cadastrar Produto" visible={visible} draggable={false} style={{ width: '50vw' }} onHide={() => setVisible(false)}>

                        <div className="flex justify-content-center align-items-center">
                            <div className="bg-white">
                                    <form
                                        onSubmit={onSubmit}
                                        // action="b/produto"
                                        // method="POST"
                                        className="p-4"
                                    >
                                        <div className="flex flex-row justify-content-center bg-white">
                                            <TextInput
                                                id="nome_produto"
                                                type="text"
                                                name="nome_produto"
                                                value={data.nome_produto}
                                                className="p-invalid text-800 bg-white w-full mb-3 mr-3"
                                                isFocused={true}
                                                placeholder="Nome Produto"
                                                onChange={(e) =>
                                                    setData(
                                                        "nome_produto",
                                                        Validar.StringWithSpecialChars(e.target.value)
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.nome_produto}
                                                className="mt-2"
                                            />

                                            <InputNumber
                                                id="preco"
                                                placeholder="Preço"
                                                value={data.preco}
                                                onChange={(e) =>
                                                    setData("preco", e.value)
                                                }
                                                className=" text-800 bg-white w-5 mb-3 border-gray-300 "
                                                mode="currency"
                                                currency="BRL"
                                                locale="pt-BR"
                                            />
                                        </div>

                                        <div className="flex flex-column align-items-center bg-white">
                                            <InputTextarea
                                                id="descricao"
                                                type="text"
                                                name="descricao"
                                                value={data.descricao}
                                                className="autoResize border-gray-300 text-800 bg-white h-6rem mb-3 w-full"
                                                autoComplete="descricao"
                                                placeholder="Descrição"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "descricao",
                                                        Validar.StringWithSpecialChars(e.target.value)
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
                                                className="flex align-items-center justify-content-center p-invalid text-800 bg-white mb-3 mr-4 w-"
                                                autoComplete="current-password"
                                                placeholder="Peso(opcional)"
                                                onChange={(e) =>
                                                    setData("peso", Validar.OnlyNumber(e.target.value))
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
                                                className="flex align-items-center justify-content-center p-invalid text-800 bg-white mb-3 mr-4 w-3"
                                                placeholder="Tamanho(opcional)"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "tamanho",
                                                        Validar.OnlyNumber(e.target.value)
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
                                                className=" flex align-items-center justify-content-centerp-invalid text-800 bg-white mb-3 w-3"
                                                placeholder="Material(opcional)"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "material",
                                                        Validar.StringNoSpecialChars(e.target.value)
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.material}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="flex flex-column align-items-center bg-white">
                                            <Dropdown
                                                id="categoria"
                                                name="categoria"
                                                value={data.categoria}
                                                options={categoriasDeProdutos}
                                                className="border-1 border-gray-300 mb-3 border-round border-0 text-50 w-full"
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

                                        <Dropdown
                                            className="border-1 border-gray-300 border-round border-0 text-50 w-full"
                                            id="fornecedor_id"
                                            name="fornecedor_id"
                                            value={data.fornecedor_id}
                                            placeholder="Selecione o fornecedor"
                                            optionLabel="razao_social"
                                            options={dropFornecedores}
                                            onChange={(e) =>
                                                setData(
                                                    "fornecedor_id",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <div className="flex items-center justify-content-between mt-4 flex-col">
                                            {/* <PrimaryButton
                                                className="ml-4"
                                                disabled={processing}
                                            >
                                                Cadastrar
                                            </PrimaryButton> */}
                                            <Button label="Cadastrar" type="submit" onClick={() => setVisible(false)}/>
                                        </div>
                                    </form>


                            </div>
                        </div>
                    </Dialog>

                    <div className="w-11 bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <Button className="mb-3" icon="pi pi-plus" label="Adicionar produto" onClick={() => setVisible(true)}/>
                        <TableDash
                            auth={auth}
                            canViewButtons={true}
                            goFetch={goFetch}
                            />

                    </div>
                </div>)

            </>
        )

        }
    }


    //------------------- FIM FORMULARIO DE CADASTRO DE PRODUTO

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

            {hasEstabelecimento === null ?



            (<NaoTemEstabelecimento nomeTela="Produto"/>)



            : FormularioProduto()}


        </AuthenticatedLayout>
    );
}
