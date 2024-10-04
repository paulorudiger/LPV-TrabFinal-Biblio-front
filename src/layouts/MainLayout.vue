<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="color: blueviolet;  background-color: blueviolet;">
      <q-toolbar>
        <img src="../assets/images/logoSite.png" height="100px;" />

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    footer

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout'
})



</script>
