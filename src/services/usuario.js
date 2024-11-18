import { api } from "../boot/axios";

export default class Usuario {
  static async getUsuario(data) {
    return new Promise((res, rej) => {
      api
        .get("/table1", data)
        .then((response) => {
          console.log(response.data);
          res(response.data);
        })
        .catch((err) => {
          console.log(err);
          rej(err.response);
        });
    });
  }
  static async postCadastroUsuario(data) {
    return new Promise((res, rej) => {
      api
        .post("/tbUsuario", data)
        .then((response) => {
          console.log(response.data);
          res(response.data);
        })
        .catch((err) => {
          console.log(err);
          rej(err.response);
        });
    });
  }
  static async getAllIds() {
    return new Promise((res, rej) => {
      api
        .get("/tbUsuario")
        .then((response) => {
          // Extrai apenas os IDs de cada usuário
          const ids = response.data.map((usuario) => usuario.idusuario);
          console.log("IDs:", ids);
          res(ids);
        })
        .catch((err) => {
          console.log(err);
          rej(err.response);
        });
    });
  }
}
