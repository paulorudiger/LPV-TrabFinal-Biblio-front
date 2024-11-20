import { defineStore } from "pinia";
import Livro from "../services/livro";

export const useLivroStore = defineStore("livro", {
  state: () => ({
    livros: [],
  }),
  actions: {
    async carregarLivros() {
      try {
        const livros = await Livro.getLivros();
        this.livros = livros.filter((livro) => livro.disponivel);
      } catch (erro) {
        console.error("Erro ao carregar os livros:", erro);
      }
    },
    async obterLivroPorId(id) {
      try {
        return await Livro.getLivroPorId(id);
      } catch (erro) {
        console.error("Erro ao obter livro por ID:", erro);
      }
    },
  },
});
