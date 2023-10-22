

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CadastroEstabelecimento from "./CadastroEstabelecimento/CadEstabelecimento";

export default function Dashboard({ auth }) {
    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard" />

                {auth && (
                    <h1>{JSON.stringify(auth.user)}</h1>
                )}

                <div className="py-12 flex justify-content-center">
                    <div className="w-11">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-7">
                            <button className="p-4 text-0 border-0 border-1 border-round-3xl" >
                                <a href="CadastroEstabelecimento">Meu Estabelecimento</a>
                            </button>
                            
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


