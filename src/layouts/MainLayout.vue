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
        <q-avatar size="60px" v-if="true">
          <img src="..\assets\images\not-logged-in-1-64.png">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>New tab</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>New incognito tab</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Recent tabs</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>History</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Downloads</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Help &amp; Feedback</q-item-section>
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

defineOptions({
  name: 'MainLayout'
})



</script>
