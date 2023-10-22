import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
// import CadastroEstabelecimento from "./CadastroEstabelecimento/CadEstabelecimento";
import CadastroProduto from "../../../js/Pages/CadastroProduto/CadProd";

export default function MeuEstabelecimento({ auth }) {
    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Meu Estabelecimento
                    </h2>
                }
            >
                <Head title="Dashboard" />

                {auth && <h1>{JSON.stringify(auth.user)}</h1>}

                <div className="py-12 flex justify-content-center">
                    <div className="w-11">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-7">
                            <p className="text-100">User: frog</p>
                            <p className="text-100">Estabelecimento: perere</p>
                            <button className="text-100">Editar</button>
                            <button className="text-100">Desativar</button>

                            {/* <div className="p-6 text-gray-900">
                                You're logged in!
                            </div> */}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
