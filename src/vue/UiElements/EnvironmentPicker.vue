<template v-slot:actions>
    <v-dialog v-model="dialog" style="width: 100%; height: 100%">

    <template v-slot:activator="{ props }">
        <v-btn
        class="pointer-events-auto text-white"
        color="blue-darken-4"
        rounded="10"
        variant="outlined"
        v-bind="props"
        block
        >
        Change Environments
        </v-btn>
    </template>

    <v-card title="Environments" class="text-center">
        <v-container class="ml-9 mr-9 mb-9">

        <v-row>
            <v-col cols="12">
            <div class="d-flex">
                <v-btn 
                    height="200px"
                    class="flex-grow-1 ms-4 d-block position-relative"
                    style="overflow: hidden;"
                    variant="flat"
                    >
                    <v-img
                        width="100%"
                        height="100%"
                        class="position-absolute"
                        cover
                        src="https://cdn.glitch.global/fab8eef8-e2ba-4158-9c30-8b45716885cc/neooffice_thumb.webp?v=1748026443808">
                        <div class="d-flex fill-height align-center justify-center">
                            <v-card-title
                                class="text-white text-center"
                                >
                                Working
                            </v-card-title>
                        </div>
                    </v-img>
                </v-btn>
                <v-btn 
                    height="200px"
                    class="flex-grow-1 ms-4 d-block position-relative"
                    style="overflow: hidden;"
                    variant="flat"
                    >
                    <v-img
                        width="100%"
                        height="100%"
                        class="position-absolute"
                        cover
                        src="https://cdn.glitch.global/fab8eef8-e2ba-4158-9c30-8b45716885cc/auditorium.jpg?v=1748026427497">
                        <div class="d-flex fill-height align-center justify-center">
                            <v-card-title
                                class="text-white text-center"
                                >
                                Learning
                            </v-card-title>
                        </div>
                    </v-img>
                </v-btn>

            </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
            <div class="d-flex">
                <v-btn 
                    height="200px"
                    class="flex-grow-1 ms-4 d-block position-relative"
                    style="overflow: hidden;"
                    variant="flat"
                    >
                    <v-img
                        width="100%"
                        height="100%"
                        class="position-absolute"
                        cover
                        src="https://cdn.glitch.global/fab8eef8-e2ba-4158-9c30-8b45716885cc/support_center_thumb.webp?v=1748026625822">
                        <div class="d-flex fill-height align-center justify-center">
                            <v-card-title
                                class="text-white text-center"
                                >
                                Support
                            </v-card-title>
                        </div>
                    </v-img>
                </v-btn>

                <v-btn 
                    height="200px"
                    class="flex-grow-1 ms-4 d-block position-relative"
                    style="overflow: hidden;"
                    variant="flat"
                    >
                    <v-img
                        width="100%"
                        height="100%"
                        class="position-absolute"
                        cover
                        src="https://cdn.glitch.global/fab8eef8-e2ba-4158-9c30-8b45716885cc/hubWorld_thumb.webp?v=1748026448312">
                        <div class="d-flex fill-height align-center justify-center">
                            <v-card-title
                                class="text-white text-center"
                                >
                                Collaboration
                            </v-card-title>
                        </div>
                    </v-img>
                </v-btn>

                <v-btn 
                    height="200px"
                    class="flex-grow-1 ms-4 d-block position-relative"
                    style="overflow: hidden;"
                    variant="flat"
                    >
                    <v-img
                        width="100%"
                        height="100%"
                        class="position-absolute"
                        cover
                        src="https://cdn.glitch.global/fab8eef8-e2ba-4158-9c30-8b45716885cc/gallery.jpg?v=1748026439755">
                        <div class="d-flex fill-height align-center justify-center">
                            <v-card-title
                                class="text-white text-center"
                                >
                                Exhibition
                            </v-card-title>
                        </div>
                    </v-img>
                </v-btn>

            </div>
            </v-col>
        </v-row>

        
        <v-row>
            <v-col cols="12">
            <div class="d-flex">
                <v-btn 
                    height="200px"
                    class="flex-grow-1 ms-4 d-block position-relative"
                    style="overflow: hidden;"
                    variant="flat"
                    >
                    <v-img
                        width="100%"
                        height="100%"
                        class="position-absolute"
                        cover
                        src="https://cdn.glitch.global/fab8eef8-e2ba-4158-9c30-8b45716885cc/ai_suite_thumb.webp?v=1748026421135">
                        <div class="d-flex fill-height align-center justify-center">
                            <v-card-title
                                class="text-white text-center"
                                >
                                Ai Tools
                            </v-card-title>
                        </div>
                    </v-img>
                </v-btn>

                <v-btn 
                    height="200px"
                    class="flex-grow-1 ms-4 d-block position-relative"
                    style="overflow: hidden;"
                    variant="flat"
                    >
                    <v-img
                        width="100%"
                        height="100%"
                        class="position-absolute"
                        cover
                        src="https://cdn.glitch.global/fab8eef8-e2ba-4158-9c30-8b45716885cc/morey_hall_ui_thumb.webp?v=1747070243805">
                        <div class="d-flex fill-height align-center justify-center">
                            <v-card-title
                                class="text-white text-center"
                                >
                                Digital Twins
                            </v-card-title>
                        </div>
                    </v-img>
                </v-btn>

                <v-btn 
                    height="200px"
                    class="flex-grow-1 ms-4 d-block position-relative"
                    style="overflow: hidden;"
                    variant="flat"
                    >
                    <v-img
                        width="100%"
                        height="100%"
                        class="position-absolute"
                        cover
                        src="https://cdn.glitch.global/fab8eef8-e2ba-4158-9c30-8b45716885cc/Capture.jpg?v=1748026430930">
                        <div class="d-flex fill-height align-center justify-center">
                            <v-card-title
                                class="text-white text-center"
                                >
                                Custom Worlds
                            </v-card-title>
                        </div>
                    </v-img>
                </v-btn>


                <v-btn 
                    height="200px"
                    class="flex-grow-1 ms-4 d-block position-relative"
                    style="overflow: hidden;"
                    variant="flat"
                    >
                    <v-img
                        width="100%"
                        height="100%"
                        class="position-absolute"
                        cover
                        src="https://cdn.glitch.global/fab8eef8-e2ba-4158-9c30-8b45716885cc/gokarts_thumb.webp?v=1748026670225">
                        <div class="d-flex fill-height align-center justify-center">
                            <v-card-title
                                class="text-white text-center"
                                >
                                Games
                            </v-card-title>
                        </div>
                    </v-img>
                </v-btn>

            </div>
            </v-col>
        </v-row>

        </v-container>
    </v-card>
    </v-dialog>         
</template>
<script setup lang="ts">
import { ref } from 'vue';


const dialog = ref(false);

</script>