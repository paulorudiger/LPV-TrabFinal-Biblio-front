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
}
