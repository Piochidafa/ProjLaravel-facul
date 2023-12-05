import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../../0PersoComponents/ProductService'; 
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Link, Head, useForm } from "@inertiajs/react";
import { toast } from 'react-toastify';
import { getAllProdutoFiltradoByDesc, getAllProduto, getAllProdutoFiltradoByDescOrdenado } from '../../../../SERVICES/produtoService';
import { getEstabelecimentoById, getEnderecoById} from '../../../../SERVICES/estabelecimentoService';
import { InputText } from 'primereact/inputtext';
import ApplicationLogo from '@/Components/ApplicationLogo';


export default function TableInicialNAutenticado() {


    const [products, setProducts] = useState([]);
    const [rowInfoEditar, setRowInfoEditar] = useState({
        name:"",
        orderBy: undefined
    })
    const [isFetching, setIsFetching] = useState(false)
    const [loading, setLoading] = useState(false);

    //<-CoreFunctions------------------------------

    const fetchData = async () => {
        try {

            let listaObtida;
            
            if(rowInfoEditar.name !== "" && rowInfoEditar.orderBy === undefined ){
                listaObtida = await getAllProdutoFiltradoByDesc(rowInfoEditar.name)

            }else if(rowInfoEditar.name !== "" && rowInfoEditar.orderBy !== undefined){

                listaObtida = await getAllProdutoFiltradoByDescOrdenado(rowInfoEditar.name, rowInfoEditar.orderBy)
            }
            else{
                listaObtida = await getAllProduto();
            }
    
            setProducts(listaObtida);
            setIsFetching(false);
  
        } catch (erro) {
            console.error('Erro ao buscar dados: ', erro);
        }
    };

    //<-UseEffect----------------------------------

    useEffect(() => {    
        if(rowInfoEditar.name !== "" && products.length === 0){
            toast.error("Produtos não encontrados")
        }    
    },[products])

    //<-Funcoes-------------------------------

    const { data, setData, post, processing, erros, reset } = useForm({
        search: "",
    });

    useEffect(() => {
        setIsFetching(true)
        fetchData()

    },[])

    useEffect(() => {
        
        if(rowInfoEditar.name === ""){
            setRowInfoEditar({...rowInfoEditar, orderBy: undefined})
        }

    },[rowInfoEditar.name])




    const prefixDinheiro0 = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }; 

    const prefixDinheiro = (rowData) => {
        return prefixDinheiro0(rowData.preco);
    };

    //<-JSX ------------------------------
    return (
        <div className="card w-screen flex flex-col justify-content-center align-items-center mt-8">


    <div className="w-screen flex flex-col justify-content-center align-items-center mt-8">
                            <div className="overflow-hidden mb-2">
                                
                                    <ApplicationLogo className="bg-center bg-contain bg-no-repeat h-4rem w-full fill-current text-green-500 mb-5" />
                                {/* <h1 className='text-4xl font-bold '>Precifica</h1> */}
                            </div>
                            <div className=" flex p-input-icon-right h-full align-content-end gap-1 ">
                                {/* <i className="pi pi-search" /> */}
                                
                                <div className='flex align-content-end '>
                                <InputText
                                    id="search"
                                    type="search"
                                    name="search"
                                    value={rowInfoEditar.name}
                                    className="w-30rem "
                                    placeholder="Busque um Produto"
                                    isFocused={true}
                                    onChange={(e) =>{
                                                                                
                                        setRowInfoEditar({...rowInfoEditar, name:e.target.value})
                                    }
                                }
                                />
                                </div>
                                <div className='flex flex-column h-full '>
                                    {/* <Button onClick={() => console.log(rowInfoEditar)}/> */}
                                <Dropdown

                                    value={rowInfoEditar.orderBy}
                                    showClear
                                    disabled={rowInfoEditar.name === ""}
                                    className='w-12'
                                    options={['Menor Preço', 'Maior Preço']}
                                    placeholder='Ordenar por'
                                    onChange={(e) => {
                                    
                                        setRowInfoEditar({...rowInfoEditar, orderBy: e.target.value})
                                        console.log(e.target.value);
                                    
                                    }}
                                
                                />
                                </div>
                            </div>

                            <div className="flex items-center justify-content-between mt-4 flex-col">
                                <Button
                                    icon="pi pi-search"
                                    iconPos="right"
                                    className="w-10rem bg-blue-600 border-0"
                                    loading={loading}
                                    onClick={() => {
                                        setIsFetching(true)
                                        fetchData()
                                    }}
                                    label="Buscar"
                                />
                            </div>
                    </div>

        <div className='w-8 mt-3 p-3 bg-green-100 border-round-2xl '>
            
        
        <DataTable
            value={products} 
            paginator 
            onLoad={loading}
            emptyMessage="Nenhum produto cadastrado"
            rowsPerPageOptions={[5, 10, 15]} 
            stripedRows 
            loading={isFetching} 
            // loading={false} 
            rows={[5]} 
            tableStyle={{ minWidth: '60rem' }} 
            className='w-full flex flex-column border-round-2xl  '
            >

            {/* <Column field="id" header="Código"></Column> */}
            <Column field="nome_produto" header="Nome" sortable ></Column>
            <Column field="descricao" header="descricao" ></Column>
            <Column Field="preco" header="Preço" body={prefixDinheiro}></Column>
            <Column field="estabelecimento.nome_fantasia" header="Estabelecimento" className=''></Column>
            {/* <Column field="enderecoOBJ.razao_social" header="" className=''></Column> */}

        </DataTable>

    </div>
</div>

);

}
        