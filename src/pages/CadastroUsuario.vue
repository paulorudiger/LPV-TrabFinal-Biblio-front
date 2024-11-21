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
                    <q-input filled v-model="usuario" label="Usuário" required style="padding: 3px;" />
                    <q-input filled v-model="nome" label="Nome" required style="padding: 3px;" />
                    <q-input filled v-model="matricula" label="Matrícula" required style="padding: 3px;" />
                    <q-input filled v-model="email" type="email" label="Email" required style="padding: 3px;" />
                    <q-input filled v-model="senha" type="password" label="Senha" required style="padding: 3px;" />
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
            usuario: '',
            nome: '',
            matricula: '',
            email: '',
            senha: '',
            confirmPassword: '',
        };
    },
    methods: {
        async submitForm() {
            try {
                // Validações
                const errors = [];

                // Validação do Username
                if (!this.usuario || this.usuario.length < 3) {
                    errors.push("O nome de usuário deve ter pelo menos 3 caracteres.");
                }

                // Validação da Matrícula
                if (!this.matricula || !/^\d+$/.test(this.matricula) || this.matricula.length < 6) {
                    errors.push("A matrícula deve conter pelo menos 6 dígitos numéricos.");
                }

                // Validação da Senha
                const passwordPattern = /^[A-Za-z\d]{5,20}$/;
                if (!this.senha || !passwordPattern.test(this.senha)) {
                    errors.push("A senha deve ter entre 5 e 20 caracteres e conter apenas letras e números.");
                }

                // Validação da Confirmação de Senha
                if (this.senha !== this.confirmPassword) {
                    errors.push("As senhas não correspondem.");
                }

                // Lança os erros de validação
                if (errors.length > 0) {
                    throw new Error(errors.join("\n"));
                }

                // Obter todos os IDs de usuário para controle e criar um novo ID
                const ids = await usuarioStore.getAllIdsUsuario();
                const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

                // Criar objeto do novo usuário
                const json = {
                    idusuario: newId,
                    usuario: this.usuario,
                    nome: this.nome,
                    matricula: this.matricula,
                    email: this.email,
                    senha: this.senha,
                    "ehProfessor": false,
                };

                // Chamar a store para cadastrar o novo usuário
                await usuarioStore.postCadastroUsuario(json);

                // Redirecionar para a página de login
                this.$router.push("/login");
                alert("Cadastro realizado com sucesso! Você será redirecionado para a página de login.");
            } catch (erro) {
                // Captura e exibe os erros de validação ou outros erros
                console.error("Erro ao cadastrar usuário:", erro.message);
                alert(erro.message);
            }
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
