
<template>
    <div class="ui-overlay d-flex justify-center" style="width: 100%;">
        <v-card>
            <v-card-text class="bg-surface-light pt-4">
                Here's some placeholder text
            </v-card-text>
            <v-img 

            src="@/assets/logo.png">

            </v-img>
        </v-card>

    </div>
</template>

<style>
.ui-overlay {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none; /* This allows clicks to pass through to the canvas */
  z-index: 10;
}
</style>
