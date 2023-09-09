import React, { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
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
        telefone: '',
    })

    const onSubmit = (e) => {
        e.preventcreateDefault();
    };
    return (
        <GuestLayout>
            <form onSubmit={onSubmit} action='/a/filial' method='POST'>
                <div about='nome_estabelecimento' >
                    <InputLabel value="Telefone" />
                    <TextInput
                        id="cnpj"
                        type="text"
                        name="nome_estabelecimento"
                        value={data.telefone}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('telefone', e.target.value)}
                    />
                    <InputError message={errors.telefone} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Cadastrar
                    </PrimaryButton>
                </div>
            </form>
            <PrimaryButton onClick={openModal}>Cadastra Endereço</PrimaryButton>
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <div className="p-4">
                    <CadastroEndereco />
                    <button style={{ background: 'red' }} onClick={closeModal}>Fechar Modal</button>
                </div>
            </Modal>
        </GuestLayout>
    );
}