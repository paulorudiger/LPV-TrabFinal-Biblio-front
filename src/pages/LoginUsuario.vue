<template>
    <q-page class="flex flex-center">
        <div class="login-container">
            <q-avatar size="80px" class="q-mb-md">
                <img src="..\assets\images\not-logged-in-1-64.png">
            </q-avatar>
            <div style="width: 300px;  text-align: center; display: block; align-self: center   ;">
                <b>Fazer login</b>
                <q-form @submit.prevent="submitForm">
                    <q-input filled v-model="username" label="Usuário" required />
                    <q-input filled v-model="password" type="password" label="Senha" required />
                    <q-btn type="submit" label="Continuar" color="purple" class="full-width" />
                </q-form>
            </div>
            <div class="social-login">
                <ion-icon name="logo-google"></ion-icon>
                <i class="fa-brands fa-google"></i>
                <q-btn flat label="Login with Google" icon="fab fa-google" class="q-mb-xs" />
                <q-btn flat label="Login with Facebook" icon="fab fa-facebook" />
            </div>
            <q-btn flat label="Não tem conta? Cadastre-se aqui" class="q-mt-md" />
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