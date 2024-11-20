<template>
    <div class="q-pa-md">
        <!-- Título da Página -->
        <b>Livros Disponíveis</b>

        <!-- Grid de Livros -->
        <q-card-section>
            <div class="row q-col-gutter-md justify-center">
                <!-- Card de Cada Livro -->
                <div class="col-4" v-for="livro in livros" :key="livro.id">
                    <q-card class="hover-card" bordered>
                        <!-- Capa do Livro -->
                        <q-img :src="livro.caminhoImagem" alt="Capa do Livro" ratio="1" class="q-mb-sm" />
                        <!-- Título do Livro -->
                        <q-card-section>
                            <div class="text-center text-bold">{{ livro.titulo }}</div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
        </q-card-section>
    </div>
</template>

<script>
import { useLivroStore } from "../stores/livro";
import { onMounted } from "vue";

export default {
    setup() {
        const livroStore = useLivroStore();

        // Carrega os livros ao montar a página
        onMounted(() => {
            livroStore.carregarLivros();
        });

        return {
            livros: livroStore.livros, // Obtém os livros da store
        };
    },
};
</script>

<style scoped>
/* Estilo para adicionar efeito de hover nos cards */
.hover-card {
    transition: transform 0.2s ease-in-out;
}

.hover-card:hover {
    transform: scale(1.05);
}
</style>