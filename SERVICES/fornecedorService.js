import { toast } from "react-toastify";

let baseUrl = "http://localhost:8000/c";

export function getAllFornecedor() {
    return new Promise((resolve, reject) => {
        axios
            .get(`${baseUrl}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}



export function getFornecedorById(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/fornecedor/${id}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function atualizarFornecedorById(id, bodyAtualizado) {
    return new Promise((resolve, reject) => {
        axios.put(`${baseUrl}/fornecedorAtualiza/${id}`, bodyAtualizado)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}



export function deleteFornecedorById(id) {
    return new Promise((resolve, reject) => {
        axios.delete(`${baseUrl}/fornecedordelete/${id}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                toast.error("Erro Ao Excluir Fornecedor")
                reject(error);
            });
    });
}