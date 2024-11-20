<!-- TODO: testar -->
<template>
    <q-page class="flex flex-center">
        <div class="cadastro-container">
            <h3 class="text-center q-mb-md">Cadastrar Livro</h3>
            <q-form @submit.prevent="cadastrarLivro" class="form-container">
                <!-- Upload da Capa -->
                <div class="upload-section">
                    <q-uploader label="Carregar capa do livro" v-model="capa" accept=".png, .jpg, .jpeg"
                        class="capa-uploader" flat bordered hide-upload-button>
                        <template v-slot:header>
                            <div class="q-uploader__header-content">
                                <q-icon name="cloud_upload" size="42px" />
                            </div>
                        </template>
                    </q-uploader>
                </div>

                <!-- Campos do formulário -->
                <q-input filled v-model="form.nome" label="Nome do Livro" required class="q-mb-sm" />
                <q-input filled v-model="form.codigo" label="Código" required class="q-mb-sm" />
                <q-input filled v-model="form.genero" label="Gênero" required class="q-mb-sm" />
                <q-input filled v-model="form.classificacaoEtaria" label="Classificação Etária" required
                    class="q-mb-sm" />
                <q-input filled v-model="form.editora" label="Editora" required class="q-mb-sm" />
                <q-input filled v-model="form.autor" label="Autor" required class="q-mb-sm" />
                <q-input filled type="textarea" v-model="form.descricao" label="Descrição" rows="4" required
                    class="q-mb-sm" />

                <!-- Botão de cadastrar -->
                <q-btn type="submit" label="Cadastrar" color="purple" rounded class="q-mt-md full-width" />
            </q-form>
        </div>
    </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Dialog } from "quasar";
import { api } from "../boot/axios";

const router = useRouter();

// Dados do formulário
const form = ref({
    nome: "",
    codigo: "",
    genero: "",
    classificacaoEtaria: "",
    editora: "",
    autor: "",
    descricao: "",
});

// Estado do upload da capa
const capa = ref([]);

// Função para cadastrar livro
const cadastrarLivro = async () => {
    if (capa.value.length === 0) {
        Dialog.create({
            title: "Erro",
            message: "Por favor, carregue a capa do livro.",
            ok: { label: "Ok", color: "red" },
        });
        return;
    }

    try {
        const dadosLivro = {
            ...form.value,
            capa: capa.value[0].name, // Simulação de upload
        };

        await api.post("/tbLivro", dadosLivro); // Adicione o livro no JSON Server
        Dialog.create({
            title: "Sucesso",
            message: "Livro cadastrado com sucesso!",
            ok: { label: "Ok", color: "green" },
        });
        router.push("/"); // Redireciona para a página inicial após o cadastro
    } catch (error) {
        console.error("Erro ao cadastrar livro:", error);
        Dialog.create({
            title: "Erro",
            message: "Ocorreu um erro ao cadastrar o livro. Tente novamente.",
            ok: { label: "Ok", color: "red" },
        });
    }
};
</script>

<style scoped>
.cadastro-container {
    width: 600px;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.upload-section {
    text-align: center;
    margin-bottom: 16px;
}

.capa-uploader {
    max-width: 200px;
    margin: 0 auto;
}

.form-container {
    display: flex;
    flex-direction: column;
}

.full-width {
    width: 100%;
}
</style>