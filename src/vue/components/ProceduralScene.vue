<template>
  <div class="scene-container">
    <canvas ref="canvasRef"></canvas>
    
    <!-- Side Panel with integrated toggle button -->
    <v-navigation-drawer
      v-model="isPanelOpen"
      location="left"
      width="300"
      floating
      class="rounded-lg elevation-5"
      theme="dark"
    >
      <template v-slot:prepend>
        <v-list-item
          title="Grid Configuration"
          prepend-icon="mdi-grid"
        ></v-list-item>
      </template>
      
      <v-divider></v-divider>
      
      <v-card class="ma-3 pa-3 rounded-lg" theme="dark">
        <v-card-text>
          <v-alert
            v-if="configSuccess"
            color="success"
            icon="mdi-check-circle"
            variant="tonal"
            class="mb-4"
            density="compact"
          >
            Grid updated successfully!
          </v-alert>
          
          <!-- X Count with numeric display -->
          <div class="d-flex align-center mb-3">
            <div class="font-weight-medium width-30">X Count:</div>
            <v-chip color="primary" variant="tonal" class="ml-3 mr-3">{{ gridConfig.xCount }}</v-chip>
          </div>
          
          <v-slider
            v-model="gridConfig.xCount"
            :min="1"
            :max="10"
            step="1"
            label="X Grid Count"
            thumb-label
            show-ticks="always"
            color="primary"
            class="mb-6"
          >
            <template v-slot:prepend>
              <v-btn
                size="small"
                icon
                variant="text"
                @click="gridConfig.xCount = Math.max(1, gridConfig.xCount - 1)"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </template>
            <template v-slot:append>
              <v-btn
                size="small"
                icon
                variant="text"
                @click="gridConfig.xCount = Math.min(10, gridConfig.xCount + 1)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
          </v-slider>
          
          <!-- Z Count with numeric display -->
          <div class="d-flex align-center mb-3">
            <div class="font-weight-medium width-30">Z Count:</div>
            <v-chip color="primary" variant="tonal" class="ml-3 mr-3">{{ gridConfig.zCount }}</v-chip>
          </div>
          
          <v-slider
            v-model="gridConfig.zCount"
            :min="1"
            :max="10"
            step="1"
            label="Z Grid Count"
            thumb-label
            show-ticks="always"
            color="primary"
            class="mb-6"
          >
            <template v-slot:prepend>
              <v-btn
                size="small"
                icon
                variant="text"
                @click="gridConfig.zCount = Math.max(1, gridConfig.zCount - 1)"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </template>
            <template v-slot:append>
              <v-btn
                size="small"
                icon
                variant="text"
                @click="gridConfig.zCount = Math.min(10, gridConfig.zCount + 1)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
          </v-slider>

          <div class="d-flex align-center justify-space-between mt-4">
            <v-chip-group v-model="selectedPreset" mandatory class="mb-4">
              <v-chip value="small" color="primary" variant="outlined" size="small">Small</v-chip>
              <v-chip value="medium" color="primary" variant="outlined" size="small">Medium</v-chip>
              <v-chip value="large" color="primary" variant="outlined" size="small">Large</v-chip>
            </v-chip-group>
          </div>
          
          <v-btn
            color="primary"
            block
            class="mt-4"
            :loading="isLoading"
            @click="updateGrid"
          >
            <v-icon left class="mr-2">mdi-refresh</v-icon>
            Update Grid
          </v-btn>
        </v-card-text>
      </v-card>
      
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            variant="tonal"
            @click="isPanelOpen = false"
          >
            <v-icon>mdi-chevron-left</v-icon>
            Close Panel
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    
    <!-- External toggle button (only visible when panel is closed) -->
    <v-btn
      v-if="!isPanelOpen"
      class="toggle-btn"
      icon
      color="primary"
      @click="isPanelOpen = true"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, watch } from 'vue';
import { ProceduralScene } from '@/babylon/scenes/proceduralScene';

export default defineComponent({
  name: 'ProceduralScene',
  setup() {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    const isPanelOpen = ref(false);
    const isLoading = ref(false);
    const configSuccess = ref(false);
    const selectedPreset = ref('medium');
    const sceneInstance = ref<ProceduralScene | null>(null);
    
    const gridConfig = reactive({
      xCount: 3,
      zCount: 3
    });
    
    // Watch for preset changes
    watch(selectedPreset, (newValue) => {
      switch(newValue) {
        case 'small':
          gridConfig.xCount = 2;
          gridConfig.zCount = 2;
          break;
        case 'medium':
          gridConfig.xCount = 3;
          gridConfig.zCount = 3;
          break;
        case 'large':
          gridConfig.xCount = 4;
          gridConfig.zCount = 4;
          break;
      }
    });
    
    const updateGrid = async () => {
      if (!sceneInstance.value) return;
      
      isLoading.value = true;
      
      try {
        await sceneInstance.value.updateGrid(gridConfig.xCount, gridConfig.zCount);
        
        // Show success message
        configSuccess.value = true;
        setTimeout(() => {
          configSuccess.value = false;
        }, 3000);
      } catch (error) {
        console.error('Failed to update grid:', error);
      } finally {
        isLoading.value = false;
      }
    };
    
    onMounted(() => {
      if (canvasRef.value) {
        sceneInstance.value = new ProceduralScene(canvasRef.value);
      }
    });
    
    return { 
      canvasRef, 
      isPanelOpen, 
      gridConfig,
      isLoading,
      configSuccess,
      selectedPreset,
      updateGrid
    };
  }
});
</script>

<style scoped>
.scene-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.toggle-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
}

.width-30 {
  width: 70px;
}
</style> 