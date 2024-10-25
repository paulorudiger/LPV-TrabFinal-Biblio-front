<template>
    <q-page class="flex flex-center">
        <div class="login-container">
            <q-avatar size="80px" class="q-mb-md">
                <img src="..\assets\images\not-logged-in-1-64.png">
            </q-avatar>
            <div style="width: 300px; text-align: center; margin: 0 auto; padding-bottom: 10px;">
                <!-- Centralização da div -->
                <b>Cadastrar Usuário</b>
                <q-form @submit.prevent="submitForm">
                    <q-input filled v-model="username" label="Usuário" required style="padding: 3px;" />
                    <q-input filled v-model="name" label="Nome" required style="padding: 3px;" />
                    <q-input filled v-model="surname" label="Sobrenome" required style="padding: 3px;" />
                    <q-input filled v-model="matricula" label="Matrícula" required style="padding: 3px;" />
                    <q-input filled v-model="email" type="email" label="Email" required style="padding: 3px;" />
                    <q-input filled v-model="password" type="password" label="Senha" required style="padding: 3px;" />
                    <q-input filled v-model="confirmPassword" type="password" label="Confirma a senha" required
                        style="padding: 3px;" />
                    <q-btn type="submit" label="Cadastrar" color="purple" class="full-width" rounded />
                    <br />
                    <q-btn type="submit" label="Cancelar cadastro" color="grey" outline rounded
                        @click="navigateToLogin()" />

                </q-form>
            </div>
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            name: '',
            surname: '',
            matricula: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    },
    methods: {
        submitForm() {
            // Lógica para submissão do formulário
            console.log(`Usuário: ${this.username}, Nome: ${this.name}, Sobrenome: ${this.surname}, Matrícula: ${this.matricula}, Email: ${this.email}, Senha: ${this.password}, Confirmar Senha: ${this.confirmPassword}`);
            // Adicione aqui a lógica para enviar os dados para o servidor ou realizar validações
        },
    },
};
</script>

<script setup>
import { useRouter } from 'vue-router'; // Importar o roteador

const router = useRouter(); // Instanciar o roteador

const navigateToLogin = () => {
    router.push('/login');
};
</script>

<style scoped>
.login-container {
    width: 400px;
    text-align: center;
    background-color: lightgrey;
    /* Cor de fundo */
}
</style>
