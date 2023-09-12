import React, { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayoutAll';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import CadFilial from '../CadastroFilial/CadFilial';
import Modal from '@/Components/Modal';
import axios from 'axios';

export default function CadastroEstabelecimento() {
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

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const estabelecimentoData = {
                nome_estabelecimento: data.nome_estabelecimento,
                cnpj: data.cnpj,
                telefone: data.telefone,
            }
            // Envia os dados do estabelecimento para a rota de criação de estabelecimento
            const responseEstabelecimento = await axios.post('/a/estabelecimento', estabelecimentoData)
            // Obtém o ID do estabelecimento criado a partir da resposta
            const estabelecimentoId = responseEstabelecimento.data.id;

            // Define o ID do estabelecimento no estado
            setData('estabelecimento_id', estabelecimentoId);
            reset();
        } catch (error) {
            console.error('Erro ao cadastrar estabelecimento:', error);
        }
    };

    return (
        <GuestLayout>
            <Head title="Cadastrar Estabelecimento " />
            <form onSubmit={onSubmit} action='/a/estabelecimento' method='POST'>
                <div about='nome_estabelecimento' >
                    <InputLabel value="Nome estabelecimento" />
                    <TextInput
                        id="cnpj"
                        type="text"
                        name="nome_estabelecimento"
                        value={data.nome_estabelecimento}
                        className="mt-1 block w-full"
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

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Cadastrar
                    </PrimaryButton>
                </div>
            </form>
            <PrimaryButton onClick={openModal}>Cadastra Filial</PrimaryButton>
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <div className="p-4">
                    <CadFilial />
                    <button style={{ background: 'red' }} onClick={closeModal}>Fechar Modal</button>
                </div>
            </Modal>
        </GuestLayout>
    );
}