<template>
    <q-page class="flex flex-center">
        <div class="login-container">
            <q-avatar size="80px" class="q-mb-md">
                <img src="..\assets\images\not-logged-in-1-64.png">
            </q-avatar>
            <div style="width: 300px; text-align: center; margin: 0 auto;"> <!-- Centralização da div -->
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
                <i class="fa-brands fa-google"></i>
                <!-- <q-btn outline label="Login with Google" icon="fab fa-google" class="q-mb-xs" /> -->
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

<script>

export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        submitForm() {
            // Lógica para submissão do formulário
            console.log(`Usuário: ${this.username}, Senha: ${this.password}`);
        },
    },
};
</script>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Método de navegação
const navigateToCadastroUsuario = () => {
    router.push('/cadastrousuario');
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