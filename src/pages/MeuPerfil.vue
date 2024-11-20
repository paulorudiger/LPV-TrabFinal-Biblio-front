<template>
    <q-page class="flex flex-center">
        <div class="perfil-container">
            <!-- Avatar do usuário -->
            <q-avatar size="120px" class="q-mb-md">
                <img :src="usuarioStore.avatarCaminho" alt="Avatar do usuário" />
            </q-avatar>
            <h3 class="text-center q-mb-md">Meus dados</h3>
            <!-- Formulário de edição de perfil -->
            <div style="width: 300px; text-align: center; margin: 0 auto; padding-bottom: 10px;">
                <q-form @submit.prevent="atualizarDados">
                    <q-input filled v-model="form.usuario" label="Usuário" required style="padding: 3px;" />
                    <q-input filled v-model="form.nome" label="Nome" required style="padding: 3px;" />
                    <q-input filled v-model="form.matricula" label="Matrícula" required style="padding: 3px;" />
                    <q-input filled v-model="form.email" type="email" label="Email" required style="padding: 3px;" />
                    <q-input filled v-model="form.senha" type="password" label="Senha" required style="padding: 3px;" />
                    <q-input filled v-model="form.confirmarSenha" type="password" label="Confirme a senha" required
                        style="padding: 3px;" />
                    <q-btn type="submit" label="Atualizar dados" color="purple" class="full-width q-mt-sm" rounded />
                    <q-btn type="button" label="Excluir perfil" color="red" outline class="full-width q-mt-sm" rounded
                        @click="excluirPerfil" />
                </q-form>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUsuarioStore } from "../stores/usuario";
import { useRouter } from "vue-router";

// Store e roteador
const usuarioStore = useUsuarioStore();
const router = useRouter();

// Dados do formulário
const form = ref({
    usuario: "",
    nome: "",
    matricula: "",
    email: "",
    senha: "",
    confirmarSenha: "",
});

// Carrega os dados do usuário ao montar o componente
onMounted(async () => {
    await usuarioStore.carregarDadosUsuario();
    if (usuarioStore.usuario) {
        form.value.usuario = usuarioStore.usuario.usuario || "";
        form.value.nome = usuarioStore.usuario.nome || "";
        form.value.matricula = usuarioStore.usuario.matricula || "";
        form.value.email = usuarioStore.usuario.email || "";
    }
});

// Função para atualizar os dados do perfil
const atualizarDados = () => {
    if (form.value.senha !== form.value.confirmarSenha) {
        alert("As senhas não conferem!");
        return;
    }

    console.log("Dados atualizados:", form.value);
    alert("Dados atualizados com sucesso!");
};

// Função para excluir o perfil
const excluirPerfil = () => {
    const confirmacao = confirm("Tem certeza que deseja excluir o perfil?");
    if (confirmacao) {
        console.log("Perfil excluído");
        router.push("/login"); // Redireciona para a página de login
        usuarioStore.sairsistema();
    }
};
</script>

<style scoped>
.perfil-container {
    width: 400px;
    text-align: center;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>