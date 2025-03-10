<template>
  <v-container class="d-flex flex-column align-center justify-center fill-height">
    <v-card class="pa-6 text-center" elevation="10" color="blue darken-3">
      <v-card-title class="text-h5 white--text">Visualização do Resultado</v-card-title>
      <iframe :src="iframeSrc" class="preview-frame mt-4"></iframe>
      <v-btn color="blue lighten-1" class="mt-4 white--text" @click="$router.push('/results')">Voltar</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    iframeSrc() {
      return 'https://example.com'; // Simulação
    }
  }
};
</script>

<style scoped>
.preview-frame {
  width: 90%;
  height: 500px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>