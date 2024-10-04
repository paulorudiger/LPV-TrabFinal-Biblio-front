import { api } from "../boot/axios";

export default class Bandas {
  static async getBandas(data) {
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
