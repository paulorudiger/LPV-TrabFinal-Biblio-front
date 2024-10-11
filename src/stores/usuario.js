import { defineStore } from "pinia";
import Usuario from "../services/usuario";

export const useUsuaruiStore = defineStore("usuario", {
  state: () => ({
    usuario: [],
    usuarioLogado: false,
  }),
  actions: {
    async getUsuario() {
      this.usuario = await Usuario.getUsuario();
    },
  },
});
