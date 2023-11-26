import React, { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayoutAll';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import CadFilial from '../CadastroFilial/CadFilial';
import Modal from '@/Components/Modal';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from 'axios';
import { getEstabelecimentoById } from '../../../../SERVICES/estabelecimentoService';

export default function CadastroEstabelecimento({ auth }) {
    

    const [allEstabelecimentoData, setAllEstabelecimentoData] = useState()
    const [controlVal, setControlVal] = useState(false)


    useEffect(() => {
        
            getEstabelecimentoById(auth.user.id).then((res) => {
        
                if(res.data != {}){
                    setAllEstabelecimentoData(res.data)
                }
            })

    },[controlVal])

    const { data, setData, post, processing, errors, reset } = useForm({
        razao_social: '',
        nome_fantasia: '',
        cnpj: '',
        telefone: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: '',

    })

    useEffect(() => {
    }, []);

    const onSubmit = async (e) => {
        // e.preventDefault();
        
        // try {
        //     const requestData = {
        //         razao_social: data.razao_social,
        //         nome_fantasia: data.nome_fantasia,
        //         cnpj: data.cnpj,
        //         telefone: data.telefone,
        //         bairro: data.bairro,
        //         cep: data.cep,
        //         cidade: data.cidade,
        //         estado: data.estado,
        //         user_id: auth.user.id,
        //     };
            
            // const response = await axios.post('/a/estabelecimento', requestData);
            // if (response.status === 201) {
            //     console.error('Deu certo:', response);
            // } else {
            //     if (response.status === 442) {
            //         console.error('Erro de validação: ', response.data.errors);
            //     } else {
            //         console.error('Erro ao cadastrar estabelecimento e endereço:', response.data.error);
            //     }
            // }
        //     setControlVal(controlVal => !controlVal)
        //     reset();

        // } catch (error) {
        //     console.error('Erro ao cadastrar estabelecimento:', error);
        // }
    };

    return (

        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cadastro Estabelecimento</h2>}
        >
            <Head title="Cadastro Estabelecimento" />

            {<h1 style={{color: 'black'}}>{JSON.stringify(allEstabelecimentoData)}</h1>}

            { !allEstabelecimentoData && (

                <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <GuestLayout>
                            <form onSubmit={onSubmit} action='a/estabelecimento' method='POST' className='p-4'>
                                <div className='grid grid-cols-2 gap-4'>

                                    <div about='razao_social' >
                                        <InputLabel value="Razao Social" />
                                        <TextInput
                                            id="razao_social"
                                            type="text"
                                            name="razao_social"
                                            value={data.razao_social}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('razao_social', e.target.value)}
                                        />

                                        <InputError message={errors.razao_social} className="mt-2" />
                                    </div>

                                    <div about='nome_fantasia' >
                                        <InputLabel value="Nome Fantasia" />
                                        <TextInput
                                            id="nome_fantasia"
                                            type="text"
                                            name="nome_fantasia"
                                            value={data.nome_fantasia}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('nome_fantasia', e.target.value)}
                                        />

                                        <InputError message={errors.nome_fantasia} className="mt-2" />
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

                                    <div about='Bairro' >
                                        <InputLabel value="Bairro" />
                                        <TextInput
                                            id="bairro"
                                            type="text"
                                            name="bairro"
                                            value={data.bairro}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('bairro', e.target.value)}
                                        />
                                        <InputError message={errors.bairro} className="mt-2" />
                                    </div>

                                    <div about='cep' >
                                        <InputLabel value="CEP" />
                                        <TextInput
                                            id="cep"
                                            type="text"
                                            name="cep"
                                            value={data.cep}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('cep', e.target.value)}
                                        />
                                        <InputError message={errors.cep} className="mt-2" />
                                    </div>

                                    <div about='cidade' >
                                        <InputLabel value="Cidade" />
                                        <TextInput
                                            id="cidade"
                                            type="text"
                                            name="cidade"
                                            value={data.cidade}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('cidade', e.target.value)}
                                        />
                                        <InputError message={errors.cidade} className="mt-2" />
                                    </div>

                                    <div about='estado' >
                                        <InputLabel value="Estado" />
                                        <TextInput
                                            id="estado"
                                            type="text"
                                            name="estado"
                                            value={data.estado}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('estado', e.target.value)}
                                        />
                                        <InputError message={errors.estado} className="mt-2" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-content-between mt-4 flex-col">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Cadastrar
                                    </PrimaryButton>
                                    {/* <PrimaryButton onClick={openModal}>Cadastra Filial</PrimaryButton> */}
                                </div>
                            </form>

                            {/* <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                                    <div className="p-4">
                                        <CadFilial />
                                        <button style={{ background: 'red' }} onClick={closeModal}>Fechar Modal</button>
                                    </div>
                                </Modal> */}

                        </GuestLayout>

                    </div>
                
                </div>
            </div>
            )}

            

        </AuthenticatedLayout>

    );
}