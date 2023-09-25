import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import PrimaryButton from "@/Components/PrimaryButton";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import InputError from "@/Components/InputError";

export default function Produto({ auth }) {
    const { data, post, processing, errors, reset, register, handleSubmit } =
        useForm({
            produto_nome: "",
            produto_preco: "",
            produto_descricao: "",
            produto_peso: "",
            produto_tamanho: "",
            produto_material: "",
            produto_categoria: "",
            produto_fornecedor: "",
        });

    useEffect(() => {}, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const produtoData = {
                produto_nome: data.produto_nome,
                produto_preco: data.produto_preco,
                produto_descricao: data.produto_descricao,
                produto_peso: data.produto_peso,
                produto_tamanho: data.produto_tamanho,
                produto_material: data.produto_material,
                produto_categoria: data.produto_categoria,
                produto_fornecedor: data.produto_fornecedor,
            };
            console.log("oi: " + produtoData);

            const response = await axios.post("/a/prod", produtoData);
            if (response.status === 201) {
                console.error("Deu certo: ", response);
            } else {
                if (response.status === 442) {
                    console.error("Erro de validação: ", response.data.errors);
                } else {
                    console.erro(
                        "Erro ao cadastrar produto: ",
                        response.data.error
                    );
                }
            }
            reset();
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
        }
    };

    return (
        <AuthenticatedLayout
            className="App"
            user={auth.user}
            header={
                <h2 className="text-center font-semibold text-xl text-gray-800 leading-tight">
                    Cadastro Produto
                </h2>
            }
        >
            <Head title="Produto" />

            <form onSubmit={onSubmit} action="a/prod" method="POST">
                <div className="flex flex-row justify-content-center bg-white">
                    <InputText
                        id="produto_nome"
                        type="text"
                        // value={data.produto_nome}
                        name="produto_nome"
                        ref={register("produto_nome")}
                        // value={data ? data.produto_nome : ""}
                        className="p-invalid text-50 bg-white w-4 mb-3 mr-3"
                        placeholder="Nome do Produto"
                    />
                    {/* <InputError
                        message={errors.produto_nome?.message}
                        className="mt-2"
                    /> */}
                    <InputText
                        id="produto_preco"
                        type="text"
                        name="produto_preco"
                        // value={data ? data.produto_preco : ""}
                        ref={register("produto_preco")}
                        className="p-invalid text-50 bg-white w-2 mb-3 "
                        placeholder="Preço"
                    />
                    {/* <InputError
                        message={errors.produto_preco}
                        className="mt-2"
                    /> */}
                </div>
                <div className="flex flex-column align-items-center bg-white">
                    <InputTextarea
                        id="produto_descricao"
                        type="text"
                        name="produto_descricao"
                        // value={data ? data.produto_descricao : ""}
                        ref={register("produto_descricao")}
                        className="autoResize p-invalid text-50 bg-white h-6rem mb-3"
                        style={{ width: "51.3%" }}
                        placeholder="Descrição"
                    />
                    {/* <InputError
                        message={errors.produto_descricao}
                        className="mt-2"
                    /> */}
                </div>
                <div className="flex flex-row justify-content-center  bg-white w-full">
                    <InputText
                        id="produto_peso"
                        type="text"
                        name="produto_peso"
                        // value={data ? data.produto_peso : ""}
                        ref={register("produto_peso")}
                        className="p-invalid text-50 bg-white mb-3 mr-4 ml-4"
                        style={{ width: "14%" }}
                        placeholder="Peso(opcional)"
                    />
                    {/* <InputError
                        message={errors.produto_peso}
                        className="mt-2"
                    /> */}
                    <InputText
                        id="produto_tamanho"
                        type="text"
                        name="produto_tamanho"
                        // value={data ? data.produto_tamanho : ""}
                        ref={register("produto_tamanho")}
                        className="p-invalid text-50 bg-white w-2  mb-3 mr-4"
                        placeholder="Tamanho(opcional)"
                    />
                    {/* <InputError
                        message={errors.produto_tamanho}
                        className="mt-2"
                    /> */}
                    <InputText
                        id="produto_material"
                        type="text"
                        name="produto_material"
                        // value={data ? data.produto_material : ""}
                        ref={register("produto_material")}
                        className="p-invalid text-50 bg-white w-2 mb-3 mr-4"
                        placeholder="Material(opcional)"
                    />
                    {/* <InputError
                        message={errors.produto_material}
                        className="mt-2"
                    /> */}
                </div>

                <div className="flex flex-column align-items-center bg-white">
                    <InputText
                        id="produto_categoria"
                        type="text"
                        name="produto_categoria"
                        // value={data ? data.produto_categoria : ""}
                        ref={register("produto_categoria")}
                        className="p-invalid text-50 bg-white  mb-3 mr-3 ml-3"
                        style={{ width: "50.9%" }}
                        placeholder="Categoria"
                    />
                    {/* <InputError
                        message={errors.produto_categoria}
                        className="mt-2"
                    /> */}
                </div>

                <div className="flex flex-column align-items-center bg-white">
                    <InputText
                        id="produto_fornecedor"
                        type="text"
                        name="produto_fornecedor"
                        // value={data ? data.produto_fornecedor : ""}
                        ref={register("produto_fornecedor")}
                        className="p-invalid text-50 bg-white mb-3 mr-3 ml-3"
                        style={{ width: "50.9%" }}
                        placeholder="Fornecedor"
                    />
                    {/* <InputError
                        message={errors.produto_fornecedor}
                        className="mt-2"
                    /> */}
                </div>

                <div
                    className="flex flex-column align-items-center bg-white"
                    disabled={processing}
                >
                    <PrimaryButton className="mb-3 p-0">
                        Cadastrar
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
