<!-- TODO: testar/fazer -->
<template>
    <q-page class="flex flex-center">
        <div class="reservas-container">
            <div class="filtro-container">
                <!-- Campo para inserir a matrícula -->
                <q-input outlined rounded v-model="matricula" label="Matrícula do aluno" dense class="q-mb-md"
                    placeholder="Insira a matrícula">
                    <template v-slot:prepend>
                        <q-icon name="filter_list" />
                    </template>
                </q-input>

                <!-- Filtro para devolvidos ou pendentes -->
                <q-toggle v-model="mostrarDevolvidos" label="Mostrar devolvidos" left-label dense />
                <!-- Botão para adicionar uma nova reserva -->
                <q-btn color="purple" rounded icon="add" dense @click="abrirJanelaReserva" />
            </div>

            <!-- Lista de Reservas -->
            <div v-for="reserva in reservasFiltradas" :key="reserva.id" class="reserva-item">
                <q-card flat bordered>
                    <q-card-section>
                        <div class="reserva-detalhes">
                            <!-- Imagem do livro -->
                            <q-img :src="reserva.capa" class="reserva-capa" />

                            <!-- Informações da reserva -->
                            <div class="reserva-informacoes">
                                <h5>{{ reserva.titulo }}</h5>
                                <p>
                                    Matrícula do aluno: {{ reserva.matricula }}
                                </p>
                                <p>
                                    Data de reserva: {{ reserva.dataReserva }}
                                </p>
                                <p>
                                    Data de devolução:
                                    {{ reserva.dataDevolucao || "Pendente" }}
                                </p>
                            </div>

                            <!-- Indicador de status -->
                            <q-chip color="green" v-if="reserva.status === 'Devolvido'" class="status-chip">
                                Devolvido
                            </q-chip>
                            <q-chip color="red" v-else class="status-chip">
                                Pendente
                            </q-chip>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>

        <!-- Janela Modal para nova reserva -->
        <q-dialog v-model="janelaAberta">
            <q-card style="min-width: 400px;">
                <q-card-section>
                    <h5 class="text-center">Nova Reserva</h5>
                </q-card-section>

                <q-card-section>
                    <q-form @submit.prevent="cadastrarReserva">
                        <q-input outlined v-model="novaReserva.matricula" label="Matrícula" dense class="q-mb-sm" />
                        <q-input outlined v-model="novaReserva.nome" label="Nome do aluno" dense class="q-mb-sm" />
                        <q-input outlined v-model="novaReserva.codigoLivro" label="Código do livro" dense
                            class="q-mb-sm" />
                        <q-input outlined v-model="novaReserva.livro" label="Livro" dense class="q-mb-sm" />
                        <q-input outlined v-model="novaReserva.dataReserva" label="Data da reserva" type="date" dense
                            class="q-mb-sm" />

                        <!-- Botão para confirmar reserva -->
                        <q-btn label="Reservar" color="purple" rounded type="submit" class="full-width" />
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Dialog } from "quasar";
import { api } from "../boot/axios";

// Estado global
const matricula = ref(""); // Matrícula para busca
const reservas = ref([]); // Lista de reservas
const mostrarDevolvidos = ref(false); // Filtro de devolvidos
const janelaAberta = ref(false); // Controle da janela de cadastro

// Estado da nova reserva
const novaReserva = ref({
    matricula: "",
    nome: "",
    codigoLivro: "",
    livro: "",
    dataReserva: "",
});

// Computed para filtrar as reservas
const reservasFiltradas = computed(() => {
    return reservas.value.filter((reserva) => {
        return (
            reserva.matricula.includes(matricula.value) &&
            (mostrarDevolvidos.value || reserva.status !== "Devolvido")
        );
    });
});

// Função para carregar reservas
const carregarReservas = async () => {
    try {
        const response = await api.get("/tbReservas");
        reservas.value = response.data;
        console.log("Reservas carregadas:", reservas.value);
    } catch (erro) {
        console.error("Erro ao carregar reservas:", erro);
        Dialog.create({
            title: "Erro",
            message: "Não foi possível carregar as reservas.",
            ok: { label: "Ok", color: "red" },
        });
    }
};

// Função para abrir janela de reserva
const abrirJanelaReserva = () => {
    janelaAberta.value = true;
};

// Função para cadastrar nova reserva
const cadastrarReserva = async () => {
    try {
        await api.post("/tbReservas", novaReserva.value);
        Dialog.create({
            title: "Sucesso",
            message: "Reserva cadastrada com sucesso!",
            ok: { label: "Ok", color: "green" },
        });
        janelaAberta.value = false;
        carregarReservas(); // Recarrega as reservas
    } catch (erro) {
        console.error("Erro ao cadastrar reserva:", erro);
        Dialog.create({
            title: "Erro",
            message: "Não foi possível cadastrar a reserva.",
            ok: { label: "Ok", color: "red" },
        });
    }
};

// Carrega reservas ao montar o componente
onMounted(carregarReservas);
</script>

<style scoped>
.reservas-container {
    width: 800px;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.filtro-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

.reserva-item {
    margin-bottom: 10px;
}

.reserva-detalhes {
    display: flex;
    align-items: center;
}

.reserva-capa {
    width: 80px;
    height: 120px;
    margin-right: 20px;
}

.reserva-informacoes {
    flex: 1;
}

.status-chip {
    margin-left: 20px;
}
</style>