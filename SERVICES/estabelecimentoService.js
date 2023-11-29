let baseUrl = "http://localhost:8000/a";

export function getAllEstabelecimento() {
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

export function getEstabelecimentoById(id) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${baseUrl}/estabelecimento/user/${id}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function deleteEstabelecimentoById(id) {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${baseUrl}/estabelecimentoDelete/${id}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function atualizarEstabelecimentoById(id, bodyAtualizado) {
    return new Promise((resolve, reject) => {
        axios
            .put(`${baseUrl}/estabelecimentoAtualizar/${id}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
