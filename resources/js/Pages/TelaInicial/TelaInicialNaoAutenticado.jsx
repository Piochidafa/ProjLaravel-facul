import ApplicationLogo from "@/Components/ApplicationLogo"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Link, Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import TableDash from "../Dashboard/TableDashboad";
import TableInicialNAutenticado from "./TableInicialNAutenticado";


export const TelaInicialNaoAutenticado = () => {

    const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    
    const { data, setData, post, processing, erros, reset } = useForm({
        search: "",
    });

    return(

        <>
        <TableInicialNAutenticado/>
        </>

        
    )



} 
