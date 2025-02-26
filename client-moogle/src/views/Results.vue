<template>
  <v-container>
    <v-card class="pa-6 result-card">
      <v-card-title class="text-h5 font-weight-bold">
        Resultados para "{{ searchQuery }}"
      </v-card-title>
      <v-divider class="my-4"></v-divider>
      <v-list>
        <v-list-item v-for="(link, index) in results" :key="index">
          <v-list-item-title class="result-link">
            <a :href="link" target="_blank">{{ link }}</a>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  background: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.result-card {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
}

.result-link a {
  color: #1a73e8;
  font-weight: 500;
  text-decoration: none;
}

.result-link a:hover {
  text-decoration: underline;
}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const searchQuery = ref(route.query.term || '');
    const results = ref<string[]>([]);

    onMounted(async () => {
      try {
        const response = await fetch(`http://localhost:3000/search/by-keyword?term=${searchQuery.value}`);
        results.value = await response.json();
      } catch (error) {
        console.error("Erro ao buscar resultados:", error);
      }
    });

    return { searchQuery, results };
  }
});
</script>
