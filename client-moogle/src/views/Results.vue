<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>Resultados para "{{ searchQuery }}"</v-card-title>
      <v-list>
        <v-list-item v-for="(link, index) in results" :key="index">
          <v-list-item-title>
            <a :href="link" target="_blank">{{ link }}</a>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const searchQuery = ref(route.query.term || '');
    const results = ref<string[]>([]);

    onMounted(async () => {
      console.log("🔵 Buscando resultados para:", searchQuery.value);

      try {
        const response = await fetch(`http://localhost:3000/search/by-keyword?term=${searchQuery.value}`);
        results.value = await response.json();

        console.log("🟢 Resultados da API:", results.value);
      } catch (error) {
        console.error("🔴 Erro ao buscar resultados:", error);
      }
    });

    return { searchQuery, results };
  }
});
</script>
