<template>
    <div class="ui-overlay d-flex justify-end" style="width: 100%; height: 100%">
        <v-card
        rounded="0"
        class=""
        prepend-icon="$vuetify"
        subtitle="Doing Frame Things"
        width="400"
        >
        <template v-slot:title>
            <span class="font-weight-black">Definitely Not Frame</span>
        </template>

        <environment-picker></environment-picker>
        

        </v-card>
    </div>
</template>
<script setup lang="ts">

    import EnvironmentPicker from './EnvironmentPicker.vue';


</script>
<style>
.ui-overlay {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 10;
}

.pointer-events-auto {
  pointer-events: auto;
}

</style>