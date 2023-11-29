import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TableDash from "@/Pages/Dashboard/TableDashboad";


export default function Dashboard({ auth }) {
    
    
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
                            <TableDash
                            auth={auth}
                            />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
