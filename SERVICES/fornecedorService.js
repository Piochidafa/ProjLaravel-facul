
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