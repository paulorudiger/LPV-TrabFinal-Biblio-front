import { defineStore } from "pinia";
import Reserva from "../services/reserva";

export const useUsuarioStore = defineStore("reserva", {
  state: () => ({}),
  actions: {
    async getAllIdsReserva() {
      try {
        const ids = await Reserva.getAllIds();
        return ids;
      } catch (error) {
        console.error("Erro ao obter IDs das reservas:", error);
        return [];
      }
    },
  },
});
