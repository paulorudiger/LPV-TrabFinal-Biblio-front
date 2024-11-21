import { api } from "../boot/axios";

export default class Livro {
  static async getLivros(data = {}) {
    return new Promise((res, rej) => {
      api
        .get("/tbLivro", { params: data }) // Passa os dados como query params
        .then((response) => {
          //  console.log("Resposta dos Livros:", response.data);
          res(response.data);
        })
        .catch((err) => {
          console.error("Erro ao buscar livros:", err);
          rej(err.response);
        });
    });
  }

  static async getLivroPorId(id) {
    return new Promise((res, rej) => {
      api
        .get(`/tbLivro/${id}`)
        .then((response) => {
          console.log("Livro obtido:", response.data);
          res(response.data);
        })
        .catch((err) => {
          // debugger;

          console.error("Erro ao buscar livro por ID:", err);
          rej(err.response || { message: "Erro ao buscar livro" });
        });
    });
  }
}
