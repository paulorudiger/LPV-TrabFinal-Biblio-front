<template>
    <q-page class="flex flex-center">
        <div class="login-container">
            <q-avatar size="80px" class="q-mb-md">
                <img src="../assets/images/not-logged-in-1-64.png" />
            </q-avatar>
            <div style="width: 300px; text-align: center; margin: 0 auto;">
                <b>Fazer login</b>
                <q-form @submit.prevent="submitForm">
                    <q-input filled v-model="username" label="Usuário" required style="padding: 3px;" />
                    <q-input filled v-model="password" type="password" label="Senha" required
                        style="padding-bottom: 10px;" />
                    <q-btn rounded type="submit" label="Continuar" color="purple" class="full-width" />
                </q-form>
            </div>
            <br />
            <q-separator inset />

            <div class="social-login">
                <q-btn outline rounded label="Login with Google" class="q-mb-xs" />
                <br />
                <q-btn outline rounded label="Login with Facebook" />
            </div>
            <br />
            <q-separator inset />

            <q-btn flat label="Não tem conta? Cadastre-se aqui" class="q-mt-md" @click="navigateToCadastroUsuario()" />
        </div>
    </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUsuarioStore } from "../stores/usuario";

// Referências para os campos do formulário
const username = ref("");
const password = ref("");

// Instâncias do roteador e da store
const router = useRouter();
const usuarioStore = useUsuarioStore();

// Função para envio do formulário de login
const submitForm = async () => {
    try {
        console.log("Tentativa de login:", username.value, password.value);
        // Autentica o usuário
        await usuarioStore.login({ usuario: username.value, senha: password.value });
        // Redireciona para a página inicial após login bem-sucedido
        router.push("/");
    } catch (erro) {
        console.error("Erro ao fazer login:", erro.message);
        alert(erro.message); // Exibe uma mensagem de erro ao usuário
    }
};

// Navegação para a página de cadastro
const navigateToCadastroUsuario = () => {
    router.push("/cadastrousuario");
};
</script>

<style scoped>
.login-container {
    width: 400px;
    text-align: center;
    background-color: lightgrey;
}

.social-login {
    margin-top: 16px;
}
</style>