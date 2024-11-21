<template>
    <q-page class="q-pa-md">
        <div class="detalhes-container">
            <div class="row">
                <!-- Imagem do Livro -->
                <div class="col-4">
                    <q-img :src="livro.caminhoImagem" ratio="4/6" />
                </div>


                <!-- Informações do Livro -->
                <div class="col-8">
                    <h1>{{ livro.titulo }}</h1>
                    <p><b>Autor:</b> {{ livro.autor }}</p>
                    <p><b>Gênero:</b> {{ livro.genero }}</p>
                    <p><b>Ano:</b> {{ livro.ano }}</p>
                    <p><b>Descrição:</b> {{ livro.descricao }}</p>
                    <q-btn :label="livro.disponivel ? 'Disponível' : 'Indisponível'" color="green"
                        v-if="livro.disponivel" />
                    <q-btn :label="livro.disponivel ? 'Disponível' : 'Indisponível'" color="red" v-else />
                </div>
            </div>
        </div>
    </q-page>
</template>
<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Livro from "../services/livro";

export default {
    setup() {
        const route = useRoute(); // Captura a rota atual
        const livro = ref({}); // Armazena os dados do livro
        const carregando = ref(true); // Indica se os dados estão carregando

        // Corrige o caminho da imagem para ser absoluto
        const ajustarCaminhoImagem = (caminhoImagem) => {
            if (caminhoImagem.startsWith("src/")) {
                return `/${caminhoImagem}`;
            }
            return caminhoImagem;
        };

        // Carrega os detalhes do livro ao montar o componente
        onMounted(async () => {
            try {
                const id = route.params.id; // Captura o ID da URL
                const dadosLivro = await Livro.getLivroPorId(id); // Busca os detalhes do livro

                // Ajusta o caminho da imagem
                var caminhoImagemAjustado = ajustarCaminhoImagem(dadosLivro.caminhoImagem);
                livro.value = dadosLivro;
                livro.value.caminhoImagem = caminhoImagemAjustado;
                console.log("Caminho corrigido:", dadosLivro.caminhoImagem);
                console.log(" livro.value.caminho", livro.value.caminhoImagem);
                console.log("Livro.value", livro.value);


            } catch (erro) {
                console.error("Erro ao carregar os detalhes do livro:", erro);
            } finally {
                carregando.value = false;
            }
        });

        return {
            livro,
            carregando,
        };
    },
};
</script>


<style scoped>
.detalhes-container {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

p {
    margin: 5px 0;
}
</style>
