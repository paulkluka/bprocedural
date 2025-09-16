<template>
  <v-app id="app-container">
    <v-main class="fill-height pa-0 ma-0 overflow-hidden">
      <UiRightbar></UiRightbar>
      <ProceduralScene />

    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import LocationClicker from './components/LocationClicker.vue';
import ProceduralScene from './components/ProceduralScene.vue';
//import UiRightbar from './UiElements/UiRightbar.vue';


</script>

<style>
html, body {
  margin: 0 !important;
  padding: 0 !important;
  height: 100% !important;
  width: 100% !important;
  overflow: hidden !important;
}

#app, #app-container {
  margin: 0 !important;
  padding: 0 !important;
  height: 100% !important;
  width: 100% !important;
  overflow: hidden !important;
}

.v-application {
  min-height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}

.v-main {
  padding: 0 !important;
  margin: 0 !important;
}

</style>