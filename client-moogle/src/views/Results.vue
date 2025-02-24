<template>
  <v-container>
    <v-card class="pa-6" color="blue darken-3">
      <v-card-title class="text-h5 white--text">Resultados da Pesquisa</v-card-title>
      <v-list>
        <v-list-item v-for="(site, index) in results" :key="index" @click="preview(site)" class="blue lighten-4">
          <v-list-item-content>
            <v-list-item-title>{{ site.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ site.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="tree-visual text-center mt-4">🌳 Árvore de busca...</div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      results: [
        { title: 'Site 1', description: 'Descrição do site 1...' },
        { title: 'Site 2', description: 'Descrição do site 2...' }
      ]
    };
  },
  methods: {
    preview(site) {
      this.$router.push({ path: '/preview', query: { site: site.title } });
    }
  }
};
</script>

<style scoped>
.tree-visual {
  font-size: 24px;
  margin-top: 20px;
  background: rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 8px;
  color: white;
}
</style>