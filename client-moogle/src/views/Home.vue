<template>
  <v-container class="d-flex flex-column align-center justify-center fill-height">
    <v-card class="pa-6 text-center search-box" elevation="8">
      <v-card-title class="text-h3 font-weight-bold">NexSearch</v-card-title>
      <v-text-field
        v-model="searchQuery"
        label="Digite sua busca..."
        variant="outlined"
        density="comfortable"
        class="mt-4 search-input"
        hide-details
        @keyup.enter="search"
      ></v-text-field>
      <v-btn 
        :disabled="loading" 
        class="mt-4 search-button" 
        @click="search"
      >
        <v-progress-circular v-if="loading" indeterminate size="20"></v-progress-circular>
        <span v-else>Buscar</span>
      </v-btn>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  background: #f8f9fa;
}

.search-box {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  padding: 32px;
}

.search-input {
  font-size: 18px;
}

.search-button {
  background: #4285f4;
  color: white;
  font-weight: bold;
  padding: 10px 24px;
  text-transform: none;
  border-radius: 8px;
}

.search-button:hover {
  background: #357ae8;
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const searchQuery = ref('');
    const loading = ref(false);
    const router = useRouter();

    const isValidUrl = (str: string) => {
      try {
        new URL(str);
        return true;
      } catch (_) {
        return false;
      }
    };

    const search = async () => {
      if (!searchQuery.value.trim()) return;
      
      if (isValidUrl(searchQuery.value)) {
        window.location.href = searchQuery.value;
        return;
      }

      loading.value = true;
      try {
        await axios.get('http://localhost:3000/search/by-keyword', {
          params: { term: searchQuery.value }
        });

        router.push({ path: '/results', query: { term: searchQuery.value } });
      } catch (error) {
        alert("Erro ao buscar resultados.");
      } finally {
        loading.value = false;
      }
    };

    return { searchQuery, loading, search };
  }
});
</script>
