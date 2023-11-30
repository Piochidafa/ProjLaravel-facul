import { Link, Head, useForm } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { InputText } from "primereact/inputtext";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Button } from "primereact/button";
import { useState } from "react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const { data, setData, post, processing, erros, reset } = useForm({
        search: "",
    });

    return (
        <div>
            <Head title="Welcome" />
            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 flex justify-content-center align-itens-center">
                    <div className="">
                        <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
                            {auth.user ? (
                                <div>
                                    <Link
                                        href={route("dashboard")}
                                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Area Administrativa
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        href={route("register")}
                                        className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="w-screen flex flex-col justify-content-center align-items-center mt-8">
                            <div className="overflow-hidden">
                                <Link href="/">
                                    <ApplicationLogo className="bg-center bg-contain bg-no-repeat h-4rem w-full fill-current text-green-500 mb-5" />
                                </Link>
                            </div>

                            <div className=" flex p-input-icon-right ">
                                <i className="pi pi-search" />
                                <InputText
                                    id="search"
                                    type="search"
                                    name="search"
                                    value={data.search}
                                    className="w-30rem"
                                    placeholder="Busque um Produto"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("search", e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-content-between mt-4 flex-col">
                                <Button
                                    icon="pi pi-search"
                                    iconPos="right"
                                    className="w-10rem bg-blue-600 border-0"
                                    loading={loading}
                                    onClick={load}
                                    label="Buscar"
                                />
                            </div>
                        </div>

                        <div className="ml-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-right sm:ml-0">
                            {/* Laravel v{laravelVersion} (PHP v{phpVersion}) */}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </div>
    );
}
