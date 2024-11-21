import { defineStore } from "pinia";
import Usuario from "../services/usuario";

export const useUsuarioStore = defineStore("usuario", {
  state: () => ({
    usuario: [],
    usuarioLogado: false,
    idusuarioLogado: null, // ID do usuário logado
    // TODO: ajustar ehProfessor
    ehProfessor: true,
  }),
  actions: {
    async carregarDadosUsuario() {
      try {
        if (this.idusuarioLogado) {
          //  debugger;
          const dados = await Usuario.getDadosUsuario(this.idusuarioLogado);
          this.usuario = dados;
          console.log("Dados do usuário carregados:", this.usuario);
        }
      } catch (erro) {
        console.error("Erro ao carregar os dados do usuário:", erro);
      }
    },
    async login(credentials) {
      try {
        const usuario = await Usuario.login(credentials); // Passa o nome de usuário e senha
        this.usuario = usuario;
        this.idusuarioLogado = usuario.id; // Salva o ID do usuário logado
        this.usuarioLogado = true;
        this.ehProfessor = usuario.ehProfessor || false;
        console.log("Login bem-sucedido, ID do usuário:", this.idusuarioLogado);
      } catch (erro) {
        console.error("Erro ao fazer login:", erro.message);
        throw erro; // Lança o erro para o componente tratar
      }
    },
    async getUsuario() {
      this.usuario = await Usuario.getUsuario();
    },
    async sairsistema() {
      console.log("Usuário deslogado");
      this.usuarioLogado = false;
      this.idusuarioLogado = null;
      this.usuario = [];
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
  async excluirUsuarioLogado() {
    try {
      if (!this.idusuarioLogado) {
        throw new Error("ID do usuário logado não encontrado.");
      }

      // Chama o serviço para excluir o usuário
      await Usuario.excluirUsuario(this.idusuarioLogado);
      console.log("Usuário excluído com sucesso.");

      // Limpa o estado após a exclusão
      this.usuario = {};
      this.usuarioLogado = false;
      this.idusuarioLogado = null;
    } catch (erro) {
      console.error("Erro ao excluir o usuário logado:", erro);
      throw erro;
    }
  },
});
