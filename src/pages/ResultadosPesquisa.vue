<template>
    <div class="q-pa-md">
        <h2>Resultados da Pesquisa</h2>
        <q-card-section v-if="carregando">
            <div class="text-center">Carregando...</div>
        </q-card-section>
        <q-card-section v-else-if="livros.length > 0">
            <div class="row q-col-gutter-md justify-center">
                <div class="col-4" v-for="livro in livros" :key="livro.id">
                    <q-card class="hover-card" bordered>
                        <q-img :src="livro.caminhoImagem" alt="Capa do Livro" ratio="1" class="q-mb-sm" />
                        <q-card-section>
                            <div class="text-center text-bold">{{ livro.titulo }}</div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
        </q-card-section>
        <q-card-section v-else>
            <div class="text-center">Nenhum resultado encontrado.</div>
        </q-card-section>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Livro from "../services/livro";
import { useRoute } from "vue-router";

export default {
    setup() {
        const route = useRoute();
        const livros = ref([]);
        const carregando = ref(true);

        const carregarLivros = async () => {
            try {
                carregando.value = true;
                const query = route.query.query || "";
                const response = await Livro.getLivros({ titulo_like: query }); // Filtra pelo título no banco de dados
                livros.value = response;
            } catch (erro) {
                console.error("Erro ao carregar os resultados da pesquisa:", erro);
            } finally {
                carregando.value = false;
            }
        };

        onMounted(carregarLivros);

        return {
            livros,
            carregando,
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