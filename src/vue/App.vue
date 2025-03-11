<template>
  <v-app>
    <v-main class="fill-height">
      <ProceduralScene />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProceduralScene from './components/ProceduralScene.vue';

export default defineComponent({
  name: 'App',
  components: {
    ProceduralScene
  }
});
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.v-application {
  background: #121212 !important;
}

.v-main {
  height: 100%;
}
</style> 