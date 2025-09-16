<template>
  <div class="canvas-container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { LocationClicker } from '@/babylon/scenes/locationClicker';

export default defineComponent({
  name: 'ProceduralScene',
  setup() {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    
    onMounted(() => {
      if (canvasRef.value) {
        new LocationClicker(canvasRef.value);
      }
    });
    
    return { canvasRef };
  }
});
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  z-index: 0;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
  margin: 0;
  padding: 0;
  touch-action: none;
  z-index: inherit;
}
</style>
