import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../../0PersoComponents/ProductService'; 
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { toast } from 'react-toastify';
import { deleteProdutoById, atualizarProdutoById, getAllProdutoFiltradoByDesc} from '../../../../SERVICES/produtoService';
import { getAllFornecedor, getFornecedorById, deleteFornecedorById, atualizarFornecedorById } from "../../../../SERVICES/fornecedorService";
import { getEnderecoById, getEstabelecimentoById } from '../../../../SERVICES/estabelecimentoService';
import { useRef } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { categoriasDeProdutos } from '../CadastroProduto/listCategoriaProdutros';
import TextInput from '@/Components/TextInput';

export default function TableCadastroFornecedor({canViewButtons, auth, goFetch}) {


    const [fornecedores, setFornecedores] = useState([]);
    const [visibleModalExcluir, setVisibleModalExcluir] = useState(false)
    const [visibleModalEditar, setVisibleModalEditar] = useState(false)
    const [rowInfo, setRowInfo] = useState({name:""})
    const [dropFornecedor, setDropFornecedores] = useState()
    const [isFetching, setIsFetching] = useState(false)
    
    const [dataEditProd, setDataEditProd] = useState({
        id:"",
        razao_social: "",
        telefone: "",
        cnpj: "",
        web_site: "",
        enderecoOBJ:{},
        cep: "",
        cidade: "",
        estado: "",
        bairro: "",
        marca: "",
        email: "",
        created_at: ""
    });

    //<-CoreFunctions------------------------------

    const fetchData = async () => {
        try{
            const listaObtida = await getAllFornecedor();
            setIsFetching(false)
            setFornecedores(listaObtida)
        }catch (erro) {
            console.error('Erro ao buscar dados: ', erro)
        }
    };

    //<-UseEffect----------------------------------

    useEffect(() => {        
    },[])

    //<-Funcoes-------------------------------

    useEffect(() => {
        setIsFetching(true)
        fetchData()

    },[goFetch])

    const onDelete = (rowData) => {
        console.log(rowData);
       
        deleteFornecedorById(rowData.id).then((data) => {     
            toast.success('Fornecedor Excluido com sucesso')
            setVisibleModalExcluir(false)
            setIsFetching(true)
            
            fetchData()
            
        })
    }


    const hasButton = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" size="small" severity="info" className="mr-1" onClick={() => {
                    setDataEditProd({...rowData})
                    setVisibleModalEditar(true)
                    }} />

                <Button icon="pi pi-trash" size='small' severity="danger" onClick={() => 
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
                    atualizarFornecedorById(dataEditProd.id, dataEditProd).then(_ => {
                        toast.warn("Fornecedor atualizado com sucesso")
                        setIsFetching(true)
                        fetchData()
                    })
                    setVisibleModalEditar(false)
                }} />
        </>
    )}
        
    const formEditProd = () => {
        return(
        
            <div className="p-5">
            {/* <div className="  "> */}
                {/* <GuestLayout> */}

                        <div className="flex flex-column align-items-center bg-white">
                            <div
                                className="flex flex-column align-items-center bg-white w-full"
                                about="razao_social"
                            >
                                <label className='flex align-self-start'><strong>Razão Social:</strong></label>
                                <TextInput
                                    id="razao_social"
                                    placeholder="Razão Social"
                                    type="text"
                                    name="razao_social"
                                    value={dataEditProd.razao_social}
                                    className="p-invalid text-800 bg-white mb-3 mr-3 ml-3 w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setDataEditProd({...dataEditProd,  razao_social: e.target.value})
                                    }
                                />

                               
                            </div>

                            <div
                                className="flex flex-column align-items-center bg-white w-12 "
                                about="marca"
                            >
                                <label className='flex align-self-start'><strong>Marca:</strong></label>
                                <TextInput
                                    id="marca"
                                    type="text"
                                    name="marca"
                                    placeholder="Marca"
                                    value={dataEditProd.marca}
                                    className=" text-800 bg-white mb-3 w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setDataEditProd({...dataEditProd,  marca: e.target.value})
                                    }
                                />
                              
                            </div>

                            <div
                                about="telefone and cnpj"
                                className="flex flex-row justify-content-between bg-white w-full gap-4"
                            >

                                <div className='w-6'>
                                <label className='flex align-self-start'><strong>Telefone:</strong></label>
                                <TextInput
                                    id="telefone"
                                    placeholder="Telefone"
                                    type="text"
                                    name="telefone"
                                    value={dataEditProd.telefone}
                                    className="p-invalid text-800 bg-white mb-3  mr-2 w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setDataEditProd({...dataEditProd,  telefone: e.target.value})

                                    }
                                />
                                </div>

                                <div className='w-6'>
                                <label className='flex '><strong>CNPJ:</strong></label>
                                <TextInput
                                    id="cnpj"
                                    placeholder="CNPJ"
                                    type="text"
                                    name="cnpj"
                                    value={dataEditProd.cnpj}
                                    className="p-invalid text-800 bg-white  mb-3 w-12"
                                    autoComplete="cnpj"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setDataEditProd({...dataEditProd,  cnpj: e.target.value})

                                    }
                                />
                                </div>
                            </div>

                            <div
                                about="cidade"
                                className="flex flex-column align-items-center bg-white w-full"
                            >
                                <label className='flex align-self-start'><strong>Cidade:</strong></label>
                                <TextInput
                                    id="cidade"
                                    type="text"
                                    name="cidade"
                                    placeholder="Cidade"
                                    value={dataEditProd.enderecoOBJ.cidade}
                                    className="p-invalid text-800 bg-white  mb-3 mr-3 ml-3 w-12"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setDataEditProd({...dataEditProd,  enderecoOBJ:{...dataEditProd.enderecoOBJ, cidade: e.target.value}})

                                    }
                                />
                               
                            </div>

                            <div
                                about="cep and estado"
                                className="flex flex-row justify-content-between bg-white w-full gap-3 "
                            >
                                <div className='w-6 '>
                                <label className='flex '><strong>CNPJ:</strong></label>
                                <TextInput
                                    id="cep"
                                    type="text"
                                    name="cep"
                                    placeholder="CEP"
                                    value={dataEditProd.enderecoOBJ.cep}
                                    className="p-invalid text-800 bg-white  mb-3 mr-3 w-12"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setDataEditProd({...dataEditProd, enderecoOBJ:{...dataEditProd.enderecoOBJ, cep: e.target.value}})
                                    }
                                />
                                    </div>
                             
                                <div className='w-6 '>
                                <label className='flex'><strong>Estado:</strong></label>        
                                <TextInput
                                    id="estado"
                                    type="text"
                                    name="estado"
                                    placeholder="Estado"
                                    value={dataEditProd.enderecoOBJ.estado}
                                    className="p-invalid text-800 bg-white  mb-3 w-12"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setDataEditProd({...dataEditProd,  enderecoOBJ:{...dataEditProd.enderecoOBJ, estado: e.target.value}})
                                    }
                                />
                               
                                    </div>
                            </div>

                            <div
                                about="Bairro"
                                className="flex flex-column align-items-center bg-white w-full"
                            >
                                <label className='flex align-self-start'><strong>Bairro:</strong></label>
                                <TextInput
                                    id="bairro"
                                    type="text"
                                    placeholder="Bairro"
                                    name="bairro"
                                    value={dataEditProd.enderecoOBJ.bairro}
                                    className="p-invalid text-800 bg-white  mb-3 mr-3 ml-3 w-12"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setDataEditProd({...dataEditProd,  enderecoOBJ:{...dataEditProd.enderecoOBJ, bairro: e.target.value}})

                                    }
                                />
                               
                            </div>

                            <div
                                about="web_site"
                                className="flex flex-column align-items-center bg-white w-full"
                            >
                                <label className='flex align-self-start'><strong>Web_site:</strong></label>
                                <TextInput
                                    id="web_site"
                                    type="text"
                                    placeholder="Web Site"
                                    name="web_site"
                                    value={dataEditProd.web_site}
                                    className="p-invalid text-800 bg-white  mb-3 mr-3 ml-3 w-12"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setDataEditProd({...dataEditProd,  web_site: e.target.value})

                                    }
                                />

                                
                            </div>

                            <div
                                about="email"
                                className="flex flex-column align-items-center bg-white w-full"
                            >
                                <label className='flex align-self-start'><strong>Email:</strong></label>
                                <TextInput
                                    id="email"
                                    placeholder="E-mail"
                                    type="text"
                                    name="email"
                                    value={dataEditProd.email}
                                    className="p-invalid text-800 bg-white  mb-3 mr-3 ml-3 w-12"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setDataEditProd({...dataEditProd,  email: e.target.value})
                                    }
                                />
                                
                            </div>
                        </div>
                        <div className="flex items-center justify-content-between mt-4 flex-col">
                            {/* <PrimaryButton
                                className="ml-4"
                                disabled={processing}
                            >
                                Cadastrar
                            </PrimaryButton> */}
                            {/* <PrimaryButton onClick={openModal}>Cadastra Filial</PrimaryButton> */}
                        </div>
                   
                    {/* <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                            <div className="p-4">
                                <CadEstabelecimento />
                                <button style={{ background: 'red' }} onClick={closeModal}>Fechar Modal</button>
                            </div>
                        </Modal> */}
                {/* </GuestLayout> */}
            {/* </div> */}
        </div>
    )} 
    //<-JSX ------------------------------

    return (
        <div className="card">
        <DataTable
            value={fornecedores} 
            paginator 
            oned
            rowsPerPageOptions={[5, 10, 15]} 
            stripedRows 
            loading={(fornecedores.length === 0 || isFetching) } 
            rows={[5]} 
            tableStyle={{ minWidth: '60rem' }} 
            className='w-full flex flex-column  '
            >

            <Column field="id" header="Código"></Column>
            <Column field="razao_social" header="Nome" sortable ></Column>
            <Column field="email" header="email" ></Column>
            <Column field="web_site" header="Site" ></Column>
            <Column field="telefone" header="Telefone" className=''></Column>
            {canViewButtons && <Column header="Acoes" body={hasButton} className='w-1 '></Column>}

        </DataTable>

        <Dialog draggable={false} visible={visibleModalExcluir} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={dialogFooter} onHide={(() => setVisibleModalExcluir(false))}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>Deseja Realmente excluir <strong>{rowInfo.razao_social} </strong>?</span>
                </div>
        </Dialog>

        <Dialog draggable={false} visible={visibleModalEditar} style={{ width: '60rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={dialogFooterEdit} onHide={(() => setVisibleModalEditar(false))}>
                <div className="confirmation-content">
                   {formEditProd()}
                </div>
            </Dialog>

  
    </div>

);

}
        