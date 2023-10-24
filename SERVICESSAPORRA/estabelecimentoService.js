
let baseUrl = 'http://localhost:8000/a'


export function getAllEstabelecimento() {
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
 
export function getEstabelecimentoById(id) {
  return new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/estabelecimento/user/${id}`).then((res) => {
      resolve(res.data);
      console.log(res.data);
    })
      .catch((error) => {
        reject(error)
      });
  });

}
