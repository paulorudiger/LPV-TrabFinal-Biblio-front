<template>
    <q-page class="q-pa-md">
        <h1>Resultados da Pesquisa</h1>
        <div v-if="carregando" class="text-center">Carregando...</div>
        <div v-else-if="livros.length > 0" class="row q-col-gutter-md justify-center">
            <div class="col-4" v-for="livro in livros" :key="livro.id">
                <q-card class="hover-card" bordered @click="navegarParaDetalhes(livro.id)">
                    <q-img :src="livro.caminhoImagem" alt="Capa do Livro" ratio="1" class="q-mb-sm" />
                    <q-card-section>
                        <div class="text-center text-bold">{{ livro.titulo }}</div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div v-else class="text-center">Nenhum livro encontrado para "{{ query }}".</div>
    </q-page>
</template>

<script>
import Livro from "../services/livro";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const query = route.query.query || ""; // Captura a pesquisa digitada
        const livros = ref([]);
        const carregando = ref(true);

        // Carregar os livros ao montar
        onMounted(async () => {
            if (!query.trim()) {
                alert("Nenhuma pesquisa foi realizada.");
                router.push("/");
                return;
            }

            try {
                carregando.value = true;
                const resultados = await Livro.searchBooks(query);
                livros.value = resultados;
            } catch (erro) {
                console.error("Erro ao carregar os resultados:", erro);
            } finally {
                carregando.value = false;
            }
        });

        const navegarParaDetalhes = (id) => {
            router.push(`/detalhes-livro/${id}`);
        };

        return {
            query,
            livros,
            carregando,
            navegarParaDetalhes,
        };
    },
};
</script>

<style scoped>
.hover-card {
    transition: transform 0.2s ease-in-out;
}

.hover-card:hover {
    transform: scale(1.05);
}
</style>