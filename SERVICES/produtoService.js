let baseUrl = "http://localhost:8000/b";

export function getAllProduto() {
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

export function deleteProdutoById(id) {
    return new Promise((resolve, reject) => {
        
        axios.delete(`${baseUrl}/delete/${id}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
// }// export function getProdutoById(id) {
//     return new Promise((resolve, reject) => {
//         axios
//             .get(`${baseUrl}/produto//${id}`)
//             .then((res) => {
//                 resolve(res.data);
//                 console.log(res.data);
//             })
//             .catch((error) => {
//                 reject(error);
//             });
//     });
// }
