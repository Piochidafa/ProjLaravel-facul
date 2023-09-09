import React, { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayoutAll';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import CadastroEndereco from '../CadastroEndereco/CadEndereco';


export default function CadFilial() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        nome_filial: '',
        telefone: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: '',
    })

    const onSubmit = (e) => {
        e.preventcreateDefault();
    };
    return (
        <GuestLayout>
            <form onSubmit={onSubmit} action='/a/filial' method='POST'>
                <div about='Nome filial' >
                    <InputLabel value="Nome filial" />
                    <TextInput
                        id="nome_filial"
                        type="text"
                        name="nome_filial"
                        value={data.nome_filial}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('nome_filial', e.target.value)}
                    />
                    <InputError message={errors.nome_filial} className="mt-2" />
                </div>
                <div about='Telephone' >
                    <InputLabel value="Telefone" />
                    <TextInput
                        id="telefone"
                        type="text"
                        name="telefone"
                        value={data.telefone}
                        className="mt-1 block w-full"
                        isFocused={true}
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

                <div about='CEP' >
                    <InputLabel value="cep" />
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

                <div about='Cidade' >
                    <InputLabel value="cidade" />
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

                <div about='Estado' >
                    <InputLabel value="estado" />
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

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Cadastrar
                    </PrimaryButton>
                </div>
            </form>
            {/* <PrimaryButton onClick={openModal}>Cadastra Endereço</PrimaryButton>
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <div className="p-4">
                    <CadastroEndereco />
                    <button style={{ background: 'red' }} onClick={closeModal}>Fechar Modal</button>
                </div>
            </Modal> */}
        </GuestLayout>
    );
}