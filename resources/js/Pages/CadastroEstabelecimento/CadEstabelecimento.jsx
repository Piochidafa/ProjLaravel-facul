import React, { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayoutAll';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

import Dropdown from '@/Components/Dropdown';

import CadFilial from '../CadastroFilial/CadFilial';
import Modal from '@/Components/Modal';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";


export default function CadastroEstabelecimento({auth}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        nome_estabelecimento: '',
        cnpj: '',
        telefone: ''

    })
    useEffect(() => {
    }, []);

    const onSubmit = (e) => {
        e.preventcreateDefault();
    };

    return (        

        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cadastro Estabelecimento</h2>}
        >
            <Head title="Cadastro Estabelecimento" />            

            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-center">Cadastro de Estabelecimento</div>
             <GuestLayout>
             <form onSubmit={onSubmit} action='/a/estabelecimento' method='POST' className='p-4'>

                 <div about='nome_estabelecimento' >
                     <InputLabel value="Nome estabelecimento" />
                     <TextInput
                        id="Nome_estabelecimento"
                        type="text"
                        name="nome_estabelecimento"
                        value={data.nome_estabelecimento}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('nome_estabelecimento', e.target.value)}
                    />

                    <InputError message={errors.nome_estabelecimento} className="mt-2" />
                </div>

                <div about='cnpj'>
                    <InputLabel value="Cnpj" />
                    <TextInput
                        id="cnpj"
                        type="text"
                        name="cnpj"
                        value={data.cnpj}
                        className="mt-1 block w-full"
                        autoComplete="cnpj"
                        isFocused={true}
                        onChange={(e) => setData('cnpj', e.target.value)}
                    />
                    <InputError message={errors.cnpj} className="mt-2" />
                </div>

                <div about='telefone'>
                    <InputLabel htmlFor="text" value="Telefone" />

                    <TextInput
                        id="telefone"
                        type="text"
                        name="telefone"
                        value={data.telefone}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('telefone', e.target.value)}
                    />

                    <InputError message={errors.telefone} className="mt-2" />
                </div>

                <div className="flex items-center justify-content-between mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Cadastrar
                    </PrimaryButton>
            <PrimaryButton onClick={openModal}>Cadastra Filial</PrimaryButton>
                </div>
            </form>


            

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <div className="p-4">
                    <CadFilial />
                    <button style={{ background: 'red' }} onClick={closeModal}>Fechar Modal</button>
                </div>
            </Modal>
        </GuestLayout>

                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
        // <GuestLayout>
        //     <Head title="Cadastrar Estabelecimento " />
        //     <form onSubmit={onSubmit} action='/a/estabelecimento' method='POST'>
        //         <div about='nome_estabelecimento' >
        //             <InputLabel value="Nome estabelecimento" />
        //             <TextInput
        //                 id="Nome_estabelecimento"
        //                 type="text"
        //                 name="nome_estabelecimento"
        //                 value={data.nome_estabelecimento}
        //                 className="mt-1 block w-full"
        //                 autoComplete="username"
        //                 isFocused={true}
        //                 onChange={(e) => setData('nome_estabelecimento', e.target.value)}
        //             />
        //             <div><h1 className='w-full'>caua lindo</h1></div>
        //             <InputError message={errors.nome_estabelecimento} className="mt-2" />
        //         </div>

        //         <div about='cnpj'>
        //             <InputLabel value="Cnpj" />
        //             <TextInput
        //                 id="cnpj"
        //                 type="text"
        //                 name="cnpj"
        //                 value={data.cnpj}
        //                 className="mt-1 block w-full"
        //                 autoComplete="cnpj"
        //                 isFocused={true}
        //                 onChange={(e) => setData('cnpj', e.target.value)}
        //             />
        //             <InputError message={errors.cnpj} className="mt-2" />
        //         </div>

        //         <div about='telefone'>
        //             <InputLabel htmlFor="text" value="Telefone" />

        //             <TextInput
        //                 id="telefone"
        //                 type="text"
        //                 name="telefone"
        //                 value={data.telefone}
        //                 className="mt-1 block w-full"
        //                 autoComplete="current-password"
        //                 onChange={(e) => setData('telefone', e.target.value)}
        //             />

        //             <InputError message={errors.telefone} className="mt-2" />
        //         </div>

        //         <div className="flex items-center justify-end mt-4">
        //             <PrimaryButton className="ml-4" disabled={processing}>
        //                 Cadastrar
        //             </PrimaryButton>
        //         </div>
        //     </form>
        //     <PrimaryButton onClick={openModal}>Cadastra Filial</PrimaryButton>
        //     <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
        //         <div className="p-4">
        //             <CadFilial />
        //             <button style={{ background: 'red' }} onClick={closeModal}>Fechar Modal</button>
        //         </div>
        //     </Modal>
        // </GuestLayout>
    );
}