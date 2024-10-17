import { defineStore } from "pinia";
import Usuario from "../services/usuario";

export const useUsuarioStore = defineStore("usuario", {
  state: () => ({
    usuario: [],
    usuarioLogado: true,
    ehProfessor: true,
  }),
  actions: {
    async getUsuario() {
      this.usuario = await Usuario.getUsuario();
    },
  },
});
