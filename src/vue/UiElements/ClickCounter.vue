<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-center">
          <h1 class="text-h3 mb-4">Babylon.js + Vuetify Integration</h1>
          <p class="text-h6 mb-6">
            Click on the 3D objects (box, sphere, cylinder) to see the interaction count update in real-time!
          </p>
        </div>
        
        <BabylonViewer />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BabylonViewer from '@/components/BabylonViewer.vue'
</script>