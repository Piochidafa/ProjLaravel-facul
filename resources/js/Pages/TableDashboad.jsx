import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../0PersoComponents/ProductService'; 
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { getAllProduto, deleteProdutoById } from '../../../SERVICES/produtoService';
import { getFornecedorById } from "../../../SERVICES/fornecedorService";
import { useRef } from 'react';

export default function TableDash({}) {


    const [products, setProducts] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false)
    const [rowInfo, setRowInfo] = useState({name:""})
    const [fornecedorInfo, setFornecedorInfo] = useState()
    const [toastControl, setToastControl] = useState("")
    const toast = useRef(null);



    const ToastDeSucessoExclusao = () =>
        {

            toast.current.show({severity:'warn', summary: 'Atenção', detail:'Produto excluido com sucesso'});

        }


    // useEffect(() => {
    //     ProductService.getProducts().then(data => setProducts(data));
    // }, []);


    useEffect(() => {

        const fetchData = async () => {
            try{
                const listaObtida = await getAllProduto();
                const listaAtualizada = await Promise.all(
                    listaObtida.map(async (item) => {
                        const valorPorId = await getFornecedorById(item.fornecedor_id);
                        return {...item, fornecedor: valorPorId.data}
                    })
                );
                setProducts(listaAtualizada)
            }catch (erro) {
                console.error('Erro ao buscar dados: ', erro)
            }
        };
        fetchData();

        // getAllProduto().then(res => {
        //     setProducts(res)
        //     res.map((rA, i) => {
        //         let a1;
        //         getFornecedorById(rA.fornecedor_id).then(rB => {
        //             let rb = rB.data;

        //             setProducts({...rA, fornecedor:rb})



        //             // setProducts(preArray => [...preArray, {...rA, fornecedor: rB.data}])
        //         })
        //     })
        //     console.log(products);
        //     // setProducts(a)
        // })
          
    },[])


    const onDelete = (rowData) => {
        deleteProdutoById(rowData.id).then(res => {
            setVisibleModal(false)
        }).then(_ => {
            fetchData()
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
                <Button icon="pi pi-pencil" size="small" severity="info" className="mr-1" onClick={() => console.log(products)} />
                
                <Toast ref={toast} />
                <Button icon="pi pi-trash"  size='small' severity="danger" onClick={() => 
                    {
                        setVisibleModal(true)
                        setRowInfo(rowData)    
                    }}/>
            </>);}
    
        
        const dialogFooter = () => {
            return(
            <>
                <Button label="No" icon="pi pi-times" outlined onClick={() => setVisibleModal(false)} />
                
                {/* <Toast ref={toast} /> */}
                <Button label="Yes" icon="pi pi-check" severity="danger" onClick={() => 
                    {
                        onDelete(rowInfo)
                        setVisibleModal(false)
                    }} />
        
            </>)}
        
    return (
        <div className="card">

        <DataTable value={products} paginator rowsPerPageOptions={[10, 15, 20]} stripedRows loading={products.length === 0} rows={[10]} tableStyle={{ minWidth: '60rem' }} className='w-full flex flex-column'>

            <Column field="id" header="Código"></Column>
            <Column field="nome_produto" header="Nome" sortable ></Column>
            <Column field="descricao" header="descricao" ></Column>
            <Column Field="preco" header="Preço" body={prefixDinheiro}></Column>
            <Column field="fornecedor.razao_social" header="Fornecedor" ></Column>
            <Column header="Acoes" body={hasButton} className='w-1 '></Column>

        </DataTable>

        <Dialog draggable={false} visible={visibleModal} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={dialogFooter} onHide={(() => setVisibleModal(false))}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>Deseja Realmente excluir <strong>{rowInfo.nome_produto} </strong>?</span>
                </div>
            </Dialog>

    </div>

);

}
        