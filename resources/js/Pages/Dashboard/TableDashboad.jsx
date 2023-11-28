import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../../0PersoComponents/ProductService'; 
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { getAllProduto, deleteProdutoById } from '../../../../SERVICES/produtoService';
import { getAllFornecedor, getFornecedorById } from "../../../../SERVICES/fornecedorService";
import { getEstabelecimentoById } from '../../../../SERVICES/estabelecimentoService';
import { useRef } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { categoriasDeProdutos } from '../CadastroProduto/listCategoriaProdutros';

export default function TableDash({canViewButtons, auth}) {


    const [products, setProducts] = useState([]);
    const [visibleModalExcluir, setVisibleModalExcluir] = useState(false)
    const [visibleModalEditar, setVisibleModalEditar] = useState(false)
    const [rowInfo, setRowInfo] = useState({name:""})
    const [dropFornecedor, setDropFornecedores] = useState()
    const [rowInfoEditar, setRowInfoEditar] = useState({name:""})
    const [isFetching, setIsFetching] = useState(false)
    const [fornecedorInfo, setFornecedorInfo] = useState()
    const [toastControl, setToastControl] = useState("")
    const toast = useRef(null);
    
    const [dataEditProd, setDataEditProd] = useState({
        nome_produto: "",
        preco: 0,
        unidade: "",
        descricao: "",
        peso: "",
        tamanho: "",
        material: "",
        categoria: "",
        fornecedor_id: {},
        estabelecimento_id: 0,

    });

    //<-CoreFunctions------------------------------

    const fetchData = async () => {
        try{
            const listaObtida = await getAllProduto();
            const listaAtualizada = await Promise.all(
                listaObtida.map(async (item) => {
                    const valorPorId = await getFornecedorById(item.fornecedor_id);
                    return {...item, fornecedor: valorPorId.data}
                })
            );
            setIsFetching(false)
            setProducts(listaAtualizada)
        }catch (erro) {
            console.error('Erro ao buscar dados: ', erro)
        }
    };


    //<-UseEffect----------------------------------

    useEffect(() => {        
        fetchData();
        getEstabelecimentoById(auth.user.id).then((res) => {
            if (res.data != {}) {
                setDataEditProd({...dataEditProd});
            }
        });
        getAllFornecedor().then((res) => {
            setDropFornecedores(res);
        });
    },[])

    //<-Funcoes-------------------------------

    
    const  ToastDeSucessoExclusao = async () =>
    {
        await toast.current.show({severity:'warn', summary: 'Atenção', detail:'Produto excluido com sucesso'});
    }

    const onDelete = (rowData) => {
        deleteProdutoById(rowData.id).then(_ => {
            setVisibleModalExcluir(false)
            setIsFetching(true)
            ToastDeSucessoExclusao().then(_ => fetchData())
        })
    }

    const prefixDinheiro0 = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }; 

    const prefixDinheiro = (rowData) => {
        return prefixDinheiro0(rowData.preco);
    };

   

    const hasButton = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" size="small" severity="info" className="mr-1" onClick={() => {
                    setDataEditProd({...rowData})
                    setRowInfoEditar(rowData)
                    setVisibleModalEditar(true)
                    }} />

                <Toast ref={toast} />
                <Button icon="pi pi-trash"  size='small' severity="danger" onClick={() => 
                    {
                        setVisibleModalExcluir(true)
                        setRowInfo(rowData)    
                    }}/>    
            </>
        );}
    
        const dialogFooter = () => {
            return(
            <>
                <Button label="Não" icon="pi pi-times" outlined onClick={() => setVisibleModalExcluir(false)} /> 

                <Toast ref={toast} />
                <Button label="Sim" icon="pi pi-check" severity="danger" onClick={() => 
                    {
                        onDelete(rowInfo)
                        setVisibleModalExcluir(false)
                    }} />
            </>
        )}

        const dialogFooterEdit = () => {
            return(
            <>
                <Button label="Cancelar" icon="pi pi-times" outlined onClick={() => setVisibleModalEditar(false)} />  
                <Button label="Salvar" icon="pi pi-check" severity="danger" onClick={() => 
                    {
                        setVisibleModalEditar(false)
                    }} />
            </>
        )}
        
        
    const formEditProd = () => {
        return(
        
            <div>
                
                <div className="flex flex-row justify-content-center bg-white">

                            <div className='w-full flex flex-column mr-4'>
                                <label><strong>Nome:</strong></label>
                                    <InputText
                                        id="nome_produto"
                                        type="text"
                                        name="nome_produto"
                                        value={dataEditProd.nome_produto}
                                        className="text-800 bg-white w-full mb-3 mr-3"
                                        isFocused={true}
                                        placeholder="Nome Produto"
                                        onChange={(e) =>
                                            setDataEditProd({...dataEditProd, nome_produto: e.target.value}
                                                )
                                            }
                                            />
                            </div>

                                
                            <div className='w-4 flex flex-column'>
                                <label><strong>Valor:</strong></label>
                                        <InputNumber
                                            id="preco"
                                            placeholder="Preço"
                                            value={dataEditProd.preco}
                                            onChange={(e) =>
                                                setDataEditProd({...dataEditProd, preco: e.target.value})
                                            }
                                            className=" text-800 bg-white w-full mb-3 border-gray-300 "
                                            mode="currency"
                                            currency="BRL"
                                            locale="pt-BR"
                                        />

                            </div>
                 </div>

                 <div className="flex flex-column align-items-center bg-white">
                                   
                            <div className='w-full flex flex-column mx-4'>
                                <label><strong>Descrição:</strong></label>
                                        <InputTextarea
                                            id="descricao"
                                            type="text"
                                            name="descricao"
                                            value={dataEditProd.descricao}
                                            className="autoResize border-gray-300 text-800 bg-white h-6rem mb-3 w-full"
                                            autoComplete="descricao"
                                            placeholder="Descrição"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setDataEditProd({...dataEditProd, descricao: e.target.value})
                                            }
                                        />
                            </div>
                </div>

                                    <div className="flex flex-row justify-content-between bg-white w-full">
                                    
                                    <div className='w-4 mr-2'>
                                    <label><strong>Peso:</strong></label>
                                        <InputText
                                            id="peso"
                                            type="text"
                                            name="peso"
                                            value={dataEditProd.peso}
                                            className="flex align-items-center justify-content-center text-800 bg-white mb-3 mr-2 w-full"
                                            autoComplete="current-password"
                                            placeholder="Peso"
                                            onChange={(e) =>
                                                setDataEditProd({...dataEditProd, peso: e.target.value})
                                            }
                                        />

                                    </div>

                                    <div className="w-4 mr-2">
                                    <label><strong>Tamanho:</strong></label>
                                        <InputText
                                            id="tamanho"
                                            type="text"
                                            name="tamanho"
                                            value={dataEditProd.tamanho}
                                            className="flex align-items-center justify-content-center text-800 bg-white mb-3 mr-2 w-full"
                                            placeholder="Tamanho"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setDataEditProd({...dataEditProd, tamanho: e.target.value}
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="w-4 mr-2">
                                    <label><strong>Material:</strong></label>                                    
                                        <InputText
                                            id="material"
                                            type="text"
                                            name="material"
                                            value={dataEditProd.material}
                                            className=" flex align-items-center justify-content-centerp-invalid text-800 bg-white mb-3 w-full "
                                            placeholder="Material"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setDataEditProd({...dataEditProd, material: e.target.value}
                                                )
                                            }
                                        />
                                     </div>
                                    </div>

                <div className="flex flex-column align-items-center bg-white">

                                <div className='w-full flex flex-column mx-4'>
                                    <label><strong>Categoria:</strong></label>
                                        <Dropdown
                                            id="categoria"
                                            name="categoria"
                                            value={dataEditProd.categoria}
                                            options={categoriasDeProdutos}
                                            className="border-1 border-gray-300 mb-3 border-round border-0 text-50 w-full"
                                            placeholder="Categoria"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setDataEditProd({...dataEditProd, categoria: e.target.value})
                                            }
                                        />
                                </div>
                </div>

                            <div className='w-full flex flex-column'>
                                <label><strong>Fornecedor:</strong></label>
                                    <Dropdown
                                        className="border-1 border-gray-300 border-round border-0 text-50 w-full"
                                        id="fornecedor"
                                        name="fornecedor"
                                        value={dataEditProd.fornecedor}
                                        placeholder="Selecione o fornecedor"
                                        optionLabel="razao_social"
                                        options={dropFornecedor}
                                        onChange={(e) =>
                                            setDataEditProd({...dataEditProd, fornecedor: e.target.value})
                                        }
                                    />
                            </div>

            </div>
        
        )} 

    //<-JSX ------------------------------

    return (
        <div className="card">
            <Button onClick={() => console.log(dataEditProd)} />
        <DataTable
            value={products} 
            paginator 
            oned
            rowsPerPageOptions={[10, 15, 20]} 
            stripedRows 
            loading={(products.length === 0 || isFetching) } 
            rows={[10]} 
            tableStyle={{ minWidth: '60rem' }} 
            className='w-full flex flex-column'
            >

            <Column field="id" header="Código"></Column>
            <Column field="nome_produto" header="Nome" sortable ></Column>
            <Column field="descricao" header="descricao" ></Column>
            <Column Field="preco" header="Preço" body={prefixDinheiro}></Column>
            <Column field="fornecedor.razao_social" header="Fornecedor" ></Column>
            {canViewButtons && <Column header="Acoes" body={hasButton} className='w-1 '></Column>}

        </DataTable>

        <Dialog draggable={false} visible={visibleModalExcluir} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={dialogFooter} onHide={(() => setVisibleModalExcluir(false))}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>Deseja Realmente excluir <strong>{rowInfo.nome_produto} </strong>?</span>
                </div>
            </Dialog>


        <Dialog draggable={false} visible={visibleModalEditar} style={{ width: '50rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={dialogFooterEdit} onHide={(() => setVisibleModalEditar(false))}>
                <div className="confirmation-content">
                   {formEditProd()}
                </div>
            </Dialog>

  
    </div>

);

}
        