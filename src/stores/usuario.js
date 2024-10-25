import { defineStore } from "pinia";
import Usuario from "../services/usuario";

export const useUsuarioStore = defineStore("usuario", {
  state: () => ({
    usuario: [],
    usuarioLogado: true,
    ehProfessor: true,
    avatarCaminho: "..src/assets/images/not-logged-in-1-64.png", // nao funciona caminho como variav
  }),
  actions: {
    async getUsuario() {
      this.usuario = await Usuario.getUsuario();
    },
  },
});
