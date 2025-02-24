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
      <v-btn 
        :disabled="loading" 
        color="blue darken-1" 
        class="mt-4 white--text" 
        @click="search"
      >
        <v-progress-circular v-if="loading" indeterminate color="white" size="20"></v-progress-circular>
        <span v-else>Buscar</span>
      </v-btn>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const searchQuery = ref('');
    const loading = ref(false);
    const router = useRouter();

    const search = async () => {
  if (!searchQuery.value.trim()) {
    console.error("🔴 O campo de busca está vazio!");
    return;
  }

  console.log("🔵 Enviando busca para a API:", searchQuery.value);

  loading.value = true;
  try {
    const response = await axios.get('http://localhost:3000/search/by-keyword', {
      params: { term: searchQuery.value }
    });

    console.log("🟢 Resultados da API:", response.data);
    router.push({
      path: '/results',
      query: { term: searchQuery.value }
    });

  } catch (error) {
    console.error("🔴 Erro ao buscar:", error);
    alert("Erro ao buscar resultados. Tente novamente.");
  } finally {
    loading.value = false;
  }
};
    return { searchQuery, loading, search };
  }
});
</script>
