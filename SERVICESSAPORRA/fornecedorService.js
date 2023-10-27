
let baseUrl = 'http://localhost:8000/a'


export function getAllFornecedor() {
    return new Promise((resolve, reject) => {
      axios.get(`${baseUrl}`).then((res) => {
        resolve(res.data);
        console.log(res.data);
      })
        .catch((error) => {
          reject(error)
        });
    });
  
  }
 
export function getFornecedorById(id) {
  return new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/Fornecedor/user/${id}`).then((res) => {
      resolve(res.data);
      console.log(res.data);
    })
      .catch((error) => {
        reject(error)
      });
  });

}
