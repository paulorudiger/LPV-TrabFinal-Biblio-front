<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: blueviolet;">
      <q-toolbar>
        <!-- Alinha a imagem à esquerda -->
        <div>
          <img src="../assets/images/logoSite.png" height="100px;" />
        </div>

        <!-- Centraliza o input -->
        <q-toolbar-title v-if="true">
          <q-input rounded outlined label-color="black" color="black" dark bg-color="light-grey" filled v-model="text"
            label="Buscar livros...">
            <template v-slot:prepend>
              <q-icon name="search"></q-icon>
            </template>
          </q-input>
        </q-toolbar-title>

        <!-- Alinha o avatar à direita -->
        <q-avatar size="60px" v-if="usuarioStore.usuarioLogado">
          <img src="..\assets\images\not-logged-in-1-64.png">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section @click="navigate()">Meu perfil</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Minhas reservas</q-item-section>
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
                <q-item-section>Sair</q-item-section>
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
import EssentialLink from 'components/EssentialLink.vue'
import { useUsuarioStore } from "src/stores/usuario";

defineOptions({
  name: 'MainLayout',
  methods: {
    navigate() {
      console.log('disparou navegação pelo scrit')
      this.$router.push("/meuperfil")
    }
  }
});

// Criar instância da store
const usuarioStore = useUsuarioStore();

</script>
