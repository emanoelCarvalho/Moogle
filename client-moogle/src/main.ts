// main.ts
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Importação do CSS global do Vuetify
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Results from './views/Results.vue';

const vuetify = createVuetify();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/results', component: Results }
  ]
});

createApp(App).use(router).use(vuetify).mount('#app');