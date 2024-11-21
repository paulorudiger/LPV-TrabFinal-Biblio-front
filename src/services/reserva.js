import { api } from "../boot/axios";

export default class Reserva {
  static async getReservas() {
    return api.get("/tbReservas");
  }

  static async postReserva(novaReserva) {
    return api.post("/tbReservas", novaReserva);
  }
  static async getAllIds() {
    return new Promise((res, rej) => {
      api
        .get("/tbReservas")
        .then((response) => {
          // Extrai apenas os IDs de cada usuário
          const ids = response.data.map((reserva) => reserva.id);
          //    console.log("IDs:", ids);
          res(ids);
        })
        .catch((err) => {
          console.log(err);
          rej(err.response);
        });
    });
  }
}
