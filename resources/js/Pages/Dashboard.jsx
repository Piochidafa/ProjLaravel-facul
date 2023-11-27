import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TableDash from "@/Pages/TableDashboad";


export default function Dashboard({ auth }) {
    
    
    console.log(auth);
    
    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Lista de produtos Precifica
                    </h2>
                }
            >
                <Head title="Dashboard" />

                <div className="py-10 flex justify-content-center">
                    <div className="w-11">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 ">
                        
                            {/* <button className="p-4 text-0 border-0 border-1 border-round-3xl">
                                <a href="MeuEstabelecimento">
                                    Meu Estabelecimento
                                </a>
                            </button> */}
                            
                            
                            <TableDash
                            canViewButtons={true}
                            
                            />

                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
