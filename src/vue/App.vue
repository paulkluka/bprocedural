<template>
  <v-app>
    <v-main>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> 