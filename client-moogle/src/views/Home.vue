<template>
  <v-container class="d-flex flex-column align-center justify-center fill-height">
    <v-card class="pa-6 text-center" elevation="10" color="blue darken-3">
      <v-card-title class="text-h4 white--text">NexSearch</v-card-title>
      <v-text-field
        v-model="searchQuery"
        label="Digite sua busca..."
        outlined
        dense
        class="mt-4"
        color="blue lighten-3"
      ></v-text-field>
      <v-btn color="blue darken-1" class="mt-4 white--text" @click="search">Buscar</v-btn>
      <v-btn color="blue lighten-2" class="mt-4 ml-2 white--text" @click="lucky">Estou com sorte</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    search() {
      this.$router.push({ name: 'results', query: { q: this.searchQuery } });
    },
    lucky() {
      alert('Funcionalidade "Estou com sorte" ainda não implementada!');
    }
  }
};
</script>