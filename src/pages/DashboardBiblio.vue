<template>
    <div class="q-pa-md">
        <q-card>
            <q-card-section>
                <h2 class="text-center">Dashboard da Biblioteca</h2>
            </q-card-section>
            <q-card-section>
                <!-- Estatísticas -->
                <div class="row">
                    <div class="col-4">
                        <q-card class="q-pa-md">
                            <h4 class="text-center">Total de Livros</h4>
                            <p class="text-center text-h6 text-bold">{{ totalLivros }}</p>
                        </q-card>
                    </div>
                    <div class="col-4">
                        <q-card class="q-pa-md">
                            <h4 class="text-center">Livros Disponíveis</h4>
                            <p class="text-center text-h6 text-bold text-positive">
                                {{ livrosDisponiveis }}
                            </p>
                        </q-card>
                    </div>
                    <div class="col-4">
                        <q-card class="q-pa-md">
                            <h4 class="text-center">Livros Emprestados</h4>
                            <p class="text-center text-h6 text-bold text-negative">
                                {{ livrosEmprestados }}
                            </p>
                        </q-card>
                    </div>
                </div>
                <!-- Gênero mais popular e autores -->
                <div class="row q-mt-md">
                    <div class="col-6">
                        <q-card class="q-pa-md">
                            <h4 class="text-center">Gênero Mais Popular</h4>
                            <p class="text-center text-h6 text-bold">{{ generoMaisPopular }}</p>
                        </q-card>
                    </div>
                    <div class="col-6">
                        <q-card class="q-pa-md">
                            <h4 class="text-center">Top 3 Autores</h4>
                            <ol class="text-center">
                                <li v-for="autor in topAutores" :key="autor.nome">
                                    {{ autor.nome }} - {{ autor.quantidade }} livro(s)
                                </li>
                            </ol>
                        </q-card>
                    </div>
                </div>
                <!-- Quantidade de Reservas -->
                <div class="row q-mt-md">
                    <div class="col-12">
                        <q-card class="q-pa-md">
                            <h4 class="text-center">Reservas Totais</h4>
                            <p class="text-center text-h6 text-bold">{{ totalReservas }}</p>
                        </q-card>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { api } from "../boot/axios";

export default {
    setup() {
        const totalLivros = ref(0);
        const livrosDisponiveis = ref(0);
        const livrosEmprestados = ref(0);
        const generoMaisPopular = ref("");
        const topAutores = ref([]);
        const totalReservas = ref(0);

        const carregarDadosDashboard = async () => {
            try {
                const [livrosResponse, reservasResponse] = await Promise.all([
                    api.get("/tbLivro"),
                    api.get("/tbReservas"),
                ]);

                const livros = livrosResponse.data;
                const reservas = reservasResponse.data;

                // Estatísticas gerais
                totalLivros.value = livros.length;
                livrosDisponiveis.value = livros.filter((livro) => livro.disponivel).length;
                livrosEmprestados.value = totalLivros.value - livrosDisponiveis.value;

                // Gênero mais popular
                const generos = livros.map((livro) => livro.genero);
                const generoCounts = generos.reduce((acc, genero) => {
                    acc[genero] = (acc[genero] || 0) + 1;
                    return acc;
                }, {});
                generoMaisPopular.value = Object.keys(generoCounts).reduce((a, b) =>
                    generoCounts[a] > generoCounts[b] ? a : b
                );

                // Top 3 autores
                const autores = livros.map((livro) => livro.autor);
                const autorCounts = autores.reduce((acc, autor) => {
                    acc[autor] = (acc[autor] || 0) + 1;
                    return acc;
                }, {});
                topAutores.value = Object.entries(autorCounts)
                    .map(([nome, quantidade]) => ({ nome, quantidade }))
                    .sort((a, b) => b.quantidade - a.quantidade)
                    .slice(0, 3);

                // Total de reservas
                totalReservas.value = reservas.length;
            } catch (erro) {
                console.error("Erro ao carregar dados do dashboard:", erro);
            }
        };

        onMounted(() => {
            carregarDadosDashboard();
        });

        return {
            totalLivros,
            livrosDisponiveis,
            livrosEmprestados,
            generoMaisPopular,
            topAutores,
            totalReservas,
        };
    },
};
</script>

<style scoped>
/* Estilos adicionais para layout */
.text-center {
    text-align: center;
}
</style>