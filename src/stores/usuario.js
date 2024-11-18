import { defineStore } from "pinia";
import Usuario from "../services/usuario";

export const useUsuarioStore = defineStore("usuario", {
  state: () => ({
    usuario: [],
    //ver localStorage
    // usuarioLogado: false,
    usuarioLogado: true,
    ehProfessor: true,
    avatarCaminho: "assets/images/not-logged-in-1-64.png", // nao funciona caminho como variav
  }),
  actions: {
    async getUsuario() {
      this.usuario = await Usuario.getUsuario();
    },
    async sairsistema() {
      console.log("async sairsistema ");
      this.usuarioLogado = false;
      this.$router.push("/login");
    },
    async postCadastroUsuario(data) {
      await Usuario.postCadastroUsuario(data);
    },
    async getAllIdsUsuario() {
      try {
        const ids = await Usuario.getAllIds();
        return ids;
      } catch (error) {
        console.error("Erro ao obter IDs dos usuários:", error);
        return [];
      }
    },
  },
});
