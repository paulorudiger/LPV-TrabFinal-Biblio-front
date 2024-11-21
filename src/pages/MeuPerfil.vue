<template>
    <q-page class="flex flex-center">
        <div class="perfil-container">
            <!-- Avatar do usuário -->
            <q-avatar size="120px" class="q-mb-md">
                <img src="src/assets/images/not-logged-in-1-64.png" alt="Avatar do usuário" />
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
                        @click="confirmarExclusao" />
                </q-form>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUsuarioStore } from "../stores/usuario";
import { useRouter } from "vue-router";
import { Dialog } from "quasar";

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
const atualizarDados = async () => {
    try {
        // Validações
        if (form.value.senha !== form.value.confirmarSenha) {
            throw new Error("As senhas não conferem!");
        }

        // Captura o idusuario logado
        const idusuario = usuarioStore.idusuarioLogado;
        if (!idusuario) {
            throw new Error("Usuário não encontrado. Faça login novamente.");
        }

        // Prepara os dados para envio
        const dadosAtualizados = {
            usuario: form.value.usuario,
            nome: form.value.nome,
            matricula: form.value.matricula,
            email: form.value.email,
            senha: form.value.senha, // Apenas se a senha for alterada
        };

        // Chama o serviço para atualizar os dados
        // await Usuario.atualizarUsuario(idusuario, dadosAtualizados);

        alert("Dados atualizados com sucesso!");
    } catch (erro) {
        console.error("Erro ao atualizar os dados do usuário:", erro.message);
        alert(erro.message || "Ocorreu um erro ao atualizar os dados.");
    }
};

// Função para abrir a janela de confirmação antes de excluir o perfil
const confirmarExclusao = () => {
    Dialog.create({
        title: "Meus dados",
        message: "Você tem certeza que deseja excluir o seu perfil? Esta ação não poderá ser desfeita.",
        cancel: true,
        persistent: true,
        ok: {
            label: "Sim",
            color: "green",
        },
        cancel: {
            label: "Não",
            color: "red",
        },
    })
        .onOk(() => {
            excluirPerfil();
        })
        .onCancel(() => {
            console.log("Usuário cancelou a exclusão.");
        });
};

// Função para excluir o perfil
// TODO: continuar função de exclusao de perfil
const excluirPerfil = async () => {
    try {
        await usuarioStore.excluirUsuarioLogado(); // Chama a ação da store
        router.push("/login"); // Redireciona para a página de login
    } catch (erro) {
        console.error("Erro ao excluir o perfil:", erro.message);
        alert("Ocorreu um erro ao excluir o perfil. Tente novamente.");
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