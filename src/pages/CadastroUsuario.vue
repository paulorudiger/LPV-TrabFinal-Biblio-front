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
                    <q-input filled v-model="matricula" label="Matrícula" required style="padding: 3px;" />
                    <q-input filled v-model="email" type="email" label="Email" required style="padding: 3px;" />
                    <q-input filled v-model="password" type="password" label="Senha" required style="padding: 3px;" />
                    <q-input filled v-model="confirmPassword" type="password" label="Confirma a senha" required
                        style="padding: 3px;" />
                    <q-btn type="submit" label="Cadastrar" color="purple" class="full-width" rounded />
                    <br />
                    <q-btn to="/login" label="Cancelar cadastro" color="grey" outline rounded @click="cancelar()" />

                </q-form>
            </div>
        </div>
    </q-page>
</template>

<script>
import { useUsuarioStore } from "src/stores/usuario";
// Criar instância da store
const usuarioStore = useUsuarioStore();

export default {
    data() {
        return {
            username: '',
            name: '',
            matricula: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    },
    methods: {
        async submitForm() {
            // Validações
            const errors = [];

            // Validação do Username
            if (!this.username || this.username.length < 3) {
                errors.push("O nome de usuário deve ter pelo menos 3 caracteres.");
            }

            // Validação do Nome
            if (!this.name || !/^[A-Za-z]+$/.test(this.name)) {
                errors.push("O nome deve conter apenas letras.");
            }

            // Validação da Matrícula
            if (!this.matricula || !/^\d+$/.test(this.matricula) || this.matricula.length < 6) {
                errors.push("A matrícula deve conter pelo menos 6 dígitos numéricos.");
            }

            // Validação da Senha
            const passwordPattern = /^[A-Za-z\d]{5,20}$/;
            if (!this.password || !passwordPattern.test(this.password)) {
                errors.push("A senha deve ter entre 5 e 20 caracteres e conter apenas letras e números.");
            }

            // Validação da Confirmação de Senha
            if (this.password !== this.confirmPassword) {
                errors.push("As senhas não correspondem.");
            }

            // Verifica se existem erros
            if (errors.length > 0) {
                console.error("Erros de validação:", errors);
                alert(errors.join("\n"));
                return;
            }
            debugger;
            // fazer o getall de todos os IDs de usuario para fazer o controle e enviar o novo ID no post
            const ids = await usuarioStore.getAllIdsUsuario();

            // Encontra o maior ID e adiciona 1 para obter o novo ID
            const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

            var json = {
                //"idusuario": 1,
                "usuario": this.usuario,
                "nome": this.nome,
                "matricula": this.matricula,
                "email": this.email,
                "senha": this.senha,
            }

            // chamar store
            //  usuarioStore.postCadastroUsuario(json);

        },

    },
};
</script>

<script setup>
import { useRouter } from 'vue-router'; // Importar o roteador

const router = useRouter(); // Instanciar o roteador

</script>

<style scoped>
.login-container {
    width: 400px;
    text-align: center;
    background-color: lightgrey;
    /* Cor de fundo */
}
</style>
