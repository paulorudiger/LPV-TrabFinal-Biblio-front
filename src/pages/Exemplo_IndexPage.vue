<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <!-- TEXTO {{ texto }}
      <cardInicial v-model:texto="texto" v-model:qtdeClicks="qtdeClicks"/>
      <cardInicial v-model:texto="texto" v-model:qtdeClicks="qtdeClicks"/> -->
      <!-- <qt-btn>{{ $t('botoes.inserir') }}</qt-btn>
      <qt-btn>{{ $t('botoes.deletar') }}</qt-btn> -->
      <!-- <q-input label="Usuario"></q-input>
      <q-input label="Senha"></q-input> -->
      <!-- <select v-model="$i18n.locale">
        <option>pt-BR</option>
        <option>en-US</option>
      </select> -->

      <!-- <q-btn v-for="item in listaBotoes" :key="item">
        {{ item }}
      </q-btn> -->

      <!-- <q-card v-for="item in produtos" :key="item.nome" class="my-card">
        <div v-if="item.exibir">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">{{ item.nome }}</div>
            <div class="text-subtitle2">{{ item.descricao }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">

            <q-icon :name="item.icone" />

            <div class="text-subtitle1">
              {{ item.preco }}
            </div>
            <div class="text-caption text-grey">
              {{ item.desc2 }}
            </div>
          </q-card-section>
          <q-separator />

          <q-card-actions align="right">
            <q-btn flat @click="exibirAlerta(item.nome)">ADD</q-btn>
            <q-btn flat>VER MAIS</q-btn>
          </q-card-actions>
        </div>
      </q-card>

      <q-dialog v-model="showAlert">
        <q-card>
          <q-card-section>
            <div class="text-h6">ADD AO CARRINHO</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ produtoSelecionado }}
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog> -->

      

    </div>
  </q-page>
</template>

<script setup>
import cardInicial from '../components/cardInicial.vue'
defineOptions({
  name: 'IndexPage',
  data: () => ({
    qtdeClicks: 0,
    texto: 'ABC',
    listaBotoes: ['Inserir', 'Deletar', 'Salvar'],
    showAlert: false, // controlar quando exibir o alerta
    produtoSelecionado: '', // qual produto foi clicado
    produtos: [
      { exibir: true, nome: 'Chinelo', descricao: 'chinelo havaianas, todo mundo usa', preco: '$ 15,00', desc2: 'qualquer coisa', icone: 'warning' },
      { exibir: true, nome: 'Tenis', descricao: 'All Stars', preco: '$ 100,00', desc2: 'akjsdakjshd', icone: 'print' },
      { exibir: true, nome: 'Camiseta', descricao: 'Gremio', preco: '$ 150,00', desc2: '', icone: 'today' },
      { exibir: false, nome: 'Tamanco', descricao: '', preco: '$ 500,00', desc2: '...', icone: 'style' }
    ]
  }),
  methods: {
    exibirAlerta(nome) {
      this.showAlert = true;
      this.produtoSelecionado = nome;
    }
  },
  components: {
    cardInicial
  }
});
</script>