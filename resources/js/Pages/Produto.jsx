import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Produto({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-center font-semibold text-xl text-gray-800 leading-tight">
                    Cadastro Produto
                </h2>
            }
        >
            <Head title="Produto" />
            <div>
                <div className="flex flex-column align-items-center bg-white">
                    <InputText
                        type="text"
                        className="p-invalid text-50 bg-white w-6 mb-3"
                        placeholder="Nome do Produto"
                    />
                    <InputText
                        type="text"
                        className="p-invalid text-50 bg-white w-6 mb-3"
                        placeholder="Preço"
                    />
                </div>
                <div className="flex flex-column align-items-center bg-white">
                    <InputText
                        type="text"
                        className="p-invalid text-50 bg-white w-6 mb-3"
                        placeholder="Descrição"
                    />
                </div>
                <div className="flex flex-column align-items-center bg-white">
                    <InputText
                        type="text"
                        className="p-invalid text-50 bg-white w-6 mb-3"
                        placeholder="Peso(opcional)"
                    />
                    <InputText
                        type="text"
                        className="p-invalid text-50 bg-white w-6 mb-3"
                        placeholder="Tamanho(opcional)"
                    />
                    <InputText
                        type="text"
                        className="p-invalid text-50 bg-white w-6 mb-3"
                        placeholder="Material(opcional)"
                    />
                </div>
                <div className="flex flex-column align-items-center bg-white">
                    <select className="text-50 w-6 mb-3">
                        <option selected disabled>
                            Categoria
                        </option>
                        <option>Júnior</option>
                        <option>Pleno</option>
                        <option>Sênior</option>
                    </select>
                </div>
                <div className="flex flex-column align-items-center bg-white">
                    <select className="text-50 w-6 mb-3">
                        <option selected disabled>
                            Fornecedor
                        </option>
                        <option>Júnior</option>
                        <option>Pleno</option>
                        <option>Sênior</option>
                    </select>
                </div>
                <div className="flex flex-column align-items-center bg-white">
                    <PrimaryButton className="mb-3 p-0" type="submit">
                        Cadastrar
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
