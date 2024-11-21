<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: blueviolet;">
      <q-toolbar>
        <!-- Alinha a imagem à esquerda -->
        <div>
          <img src="../assets/images/logoSite.png" height="100px;" @click="navigateToHome()" />
        </div>

        <!-- Centraliza o input -->
        <q-toolbar-title v-if="usuarioStore.usuarioLogado">
          <!-- TODO: corrigir pesquisa livros -->
          <q-input rounded outlined label-color="black" color="black" dark bg-color="light-grey" filled
            v-model="searchQuery" @keyup.enter="searchBooks" label="Buscar livros...">
            <template v-slot:prepend>
              <q-icon name="search" @click="searchBooks" />
            </template>
          </q-input>

        </q-toolbar-title>

        <!-- Alinha o avatar à direita -->
        <q-avatar size="60px" v-if="usuarioStore.usuarioLogado">
          <!-- Carrega a imagem do avatar via store -->
          <img src="src/assets/images/not-logged-in-1-64.png" />
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section @click="navigateToPerfil()">Meu perfil</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section @click="navigateToReservas()">Minhas reservas</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="navigateToCadLivro()" v-if="usuarioStore.ehProfessor">
                <q-item-section>Cadastrar Livro</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="navigateToDashboard()">
                <q-item-section>Dashboard</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="navigateToManterReserva()" v-if="usuarioStore.ehProfessor">
                <q-item-section>Gerenciar reservas</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section @click="logout()">Sair</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useUsuarioStore } from "src/stores/usuario";
import { useRouter } from "vue-router";
import { ref } from "vue";

// Criar instância da store
const usuarioStore = useUsuarioStore();
const router = useRouter();
const searchQuery = ref("");

const searchBooks = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/resultados", query: { query: searchQuery.value } });
  }
};

// Funções de navegação
function logout() {
  usuarioStore.sairsistema();
  router.push("/login");
}

defineOptions({
  name: "MainLayout",
  methods: {
    navigateToPerfil() {
      this.$router.push("/meuperfil");
    },
    navigateToReservas() {
      this.$router.push("/paginainicial"); // TODO: mudar para ir para reservas
    },
    navigateToCadLivro() {
      this.$router.push("/cadlivro"); // TODO: mudar para ir para reservas
    },
    navigateToHome() {
      this.$router.push("/");
    },
    navigateToManterReserva() {
      this.$router.push("/manterreserva");
    },
    navigateToDashboard() {
      this.$router.push("/dashboard");
    },
  },
});
</script>
