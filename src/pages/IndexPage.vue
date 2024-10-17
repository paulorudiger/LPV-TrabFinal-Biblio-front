<template>
  <!-- <q-page class="flex flex-center">
        <div class="q-pa-md row items-start q-gutter-md">
            <div class="col">
                Bandas: {{ bandas }}
                <div class="row" style="margin: 10px;">
                    <q-btn @click="getBandas()">Buscar bandas</q-btn>
                </div>
            </div>
        </div>
    </q-page> -->
  <q-btn to="/clubes">CLUBES</q-btn>
  <q-btn @click="navigate()">ESTILOS</q-btn>
</template>

<script setup>
import { useBandasStore } from '../stores/bandas'
import { mapActions, mapState } from 'pinia'
defineOptions({
  name: 'IndexPage',
  computed: {
    ...mapState(useBandasStore, ['bandas'])
  },
  methods: {
    ...mapActions(useBandasStore, ['getBandas']),
    navigate() {
      console.log('disparou navegação pelo scrit')
      this.$router.push("/estilos")
    }
  }
});
</script>
