<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { ProceduralScene } from '@/babylon/scenes/proceduralScene';

export default defineComponent({
  name: 'ProceduralScene',
  setup() {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    
    onMounted(() => {
      if (canvasRef.value) {
        new ProceduralScene(canvasRef.value);
      }
    });
    
    return { canvasRef };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

canvas{
width: 100%;
height: 100%;
}

</style> 