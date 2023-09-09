import React, { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayoutAll';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function CadastroEndereco() {
    const { data, setData, post, processing, errors, reset } = useForm({
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
            <Head title="Cadastrar Endereço" />
            <form onSubmit={onSubmit} action='/a/filial/endereco' method='POST'>
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

                <div about='cidade' >
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

                <div about='estado' >
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
        </GuestLayout>
    )
}