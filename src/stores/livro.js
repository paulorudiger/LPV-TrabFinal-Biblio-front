import { defineStore } from "pinia";
import Livro from "../services/livro";

export const useLivroStore = defineStore("livro", {
  state: () => ({
    livros: [],
    carregando: false, // Estado para indicar carregamento
  }),
  actions: {
    async carregarLivros() {
      this.carregando = true; // Inicia o estado de carregamento
      try {
        const livros = await Livro.getLivros();
        this.livros = livros.filter((livro) => livro.disponivel);
      } catch (erro) {
        console.error("Erro ao carregar os livros:", erro);
      } finally {
        this.carregando = false; // Finaliza o carregamento
      }
    },
    async getLivroPorId(id) {
      try {
        return await Livro.getLivroPorId(id);
      } catch (erro) {
        console.error("Erro ao obter livro por ID:", erro);
      }
    },
  },
});
