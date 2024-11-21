import { api } from "../boot/axios";

export default class Reserva {
  static async getReservas() {
    return api.get("/tbReservas");
  }

  static async postReserva(novaReserva) {
    return api.post("/tbReservas", novaReserva);
  }
}
