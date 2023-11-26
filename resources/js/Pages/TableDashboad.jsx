import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../0PersoComponents/ProductService'; 
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { getAllProduto } from '../../../SERVICES/produtoService';
import { deleteProdutoById } from "../../../SERVICES/produtoService";
import { useRef } from 'react';

export default function TableDash({}) {


    const [products, setProducts] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false)
    const [rowInfo, setRowInfo] = useState({name:""})
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

        getAllProduto().then(res => {
            setProducts(res)
        })


    },[])


    const onDelete = (rowData) => {
        deleteProdutoById(rowData.id).then(res => {
            setVisibleModal(false)
            
            
        }).then(_ => {
            
            getAllProduto().then(res => {
                setProducts(res)
            }).then((_) => {

                setTimeout(() => {
                    ToastDeSucessoExclusao()
                }, 120);
                
            })
        })
    }

    const hasButton = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" size="small" severity="info" className="mr-1" onClick={() => console.log(rowData)} />
                
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

        <DataTable value={products} paginator rowsPerPageOptions={[10, 15, 20]} rows={[10]} tableStyle={{ minWidth: '60rem' }} className='w-full flex flex-column'>
{/* 
        <Column field="code" header="Code"></Column>
            <Column field="name" header="Name" ></Column>
            <Column field="category" header="Category" ></Column>
            <Column field="quantity" header="Quantity"></Column>
            <Column header="Quantity" body={hasButton} className='w-1 '></Column> */}


            <Column field="id" header="ID"></Column>
            <Column field="nome_produto" header="Nome do Produto" ></Column>
            <Column field="categoria" header="Categoria" ></Column>
            <Column field="peso" header="Peso"></Column>
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
        