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
          <q-input rounded outlined label-color="black" color="black" dark bg-color="light-grey" filled v-model="text"
            label="Buscar livros...">
            <template v-slot:prepend>
              <q-icon name="search"></q-icon>
            </template>
          </q-input>
        </q-toolbar-title>

        <!-- Alinha o avatar à direita -->
        <q-avatar size="60px" v-if="usuarioStore.usuarioLogado">

          <img :src="usuarioStore.avatarCaminho"> <q-menu>

            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section @click="navigateToPerfil()">Meu perfil</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section @click="navigateToReservas()">Minhas reservas</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup v-if="usuarioStore.ehProfessor">
                <q-item-section>Cadastrar Livro</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Dashboard</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup v-if="usuarioStore.ehProfessor">
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
import { ref } from 'vue'
import { useUsuarioStore } from "src/stores/usuario";
// Criar instância da store
const usuarioStore = useUsuarioStore();
import { useRouter } from 'vue-router'; // Importar o roteador // TODO: entender
const router = useRouter(); // Instanciar o roteador


function logout() {
  usuarioStore.sairsistema();
  router.push("/login");
}

defineOptions({
  name: 'MainLayout',
  methods: {
    navigateToPerfil() {
      this.$router.push("/meuperfil")
    },
    navigateToReservas() {
      this.$router.push("/paginainicial") // mudar para ir para reservas
    },
    navigateToHome() {
      this.$router.push("/")
    },

  }
});


</script>
