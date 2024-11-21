<template>
    <div class="q-pa-md">
        <!-- Título da Página -->
        <b>Livros Disponíveis</b>

        <!-- Verifica se os livros estão carregando -->
        <q-card-section v-if="carregando">
            <div class="text-center">Carregando...</div>
        </q-card-section>

        <!-- Exibe os livros -->
        <q-card-section v-else-if="livros && livros.length > 0">
            <div class="row q-col-gutter-md justify-center">
                <!-- Card de Cada Livro -->
                <div class="col-4" v-for="livro in livros" :key="livro.id">
                    <q-card class="hover-card" bordered @click="navegarParaDetalhes(livro.id)">
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

        <!-- Caso não existam livros disponíveis -->
        <q-card-section v-else>
            <div class="text-center">Nenhum livro disponível.</div>
        </q-card-section>
    </div>
</template>


<script>
import { useLivroStore } from "../stores/livro";
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";

export default {
    setup() {
        const livroStore = useLivroStore();
        const router = useRouter(); // Instância do roteador
        const carregando = ref(true); // Estado para indicar carregamento

        // Carrega os livros ao montar a página
        onMounted(async () => {
            try {
                carregando.value = true;
                await livroStore.carregarLivros();
            } finally {
                carregando.value = false;
            }
        });

        // Computed property para reatividade
        const livros = computed(() => livroStore.livros);

        // Função para redirecionar para a página de detalhes do livro
        const navegarParaDetalhes = (id) => {
            router.push(`/detalhes-livro/${id}`);
        };

        return {
            livros, // Livros reativos
            carregando, // Indica se está carregando
            navegarParaDetalhes, // Função para navegação
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
