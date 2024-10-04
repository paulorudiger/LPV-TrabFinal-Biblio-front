<template>
    <q-card class="my-card text-white" style="background: radial-gradient(circle, #32a2ff 0%, #880178 100%)">
        <q-card-section>
            <div class="text-h6">Card teste Clicks</div>
            <div class="text-subtitle2">Quantos clicks você executou</div>
        </q-card-section>
        <q-input label="texto" :model-value="texto" 
          @update:model-value="(text) => $emit('update:texto', text)">
        </q-input>
        <q-card-section class="q-pt-nome">x
            {{ qtdeClicks }}
        </q-card-section>

        <q-card-section class="q-pt-nome">
            <q-btn @click="$emit('update:qtdeClicks', qtdeClicks + 1)"> Click-me! </q-btn>
        </q-card-section>
    </q-card>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent ({
    name: 'cardInicial',
    props: {
        qtdeClicks: {
            type: Number,
            default: 0
        },
        texto: {
            type: String,
            default: ''
        }
    }
  })

</script>