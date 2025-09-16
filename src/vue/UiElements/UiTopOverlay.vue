<template>
    <div class="cookie-banner d-flex justify-start">
        <v-banner stacked>

        <template v-slot:actions>
            <v-dialog v-model="dialog" style="width: 100%; height: 100%">
            <template v-slot:activator="{ props }">
                <v-btn
                class="text-none"
                color="blue-darken-4"
                rounded="10"
                variant="outlined"
                v-bind="props"
                >
                Change Environments
                </v-btn>
            </template>

              <v-card title="Environments" class="text-center">
                <v-container>

                  <v-row>
                    <v-col cols="12">
                      <div class="d-flex">
                        <v-card text="Card1" class="flex-grow-1 mr-2">
                          
                        </v-card>
                        <v-card text="Card2" class="flex-grow-1 ml-2">
                          
                        </v-card>
                      </div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <div class="d-flex">
                        <v-card text="Card3" class="flex-grow-1 mr-2">
                         
                          
                        </v-card>
                        <v-card text="Card3" class="flex-grow-1 ml-2">
                          
                        </v-card>
                        <v-card text="Card3" class="flex-grow-1 ml-2">
                          
                        </v-card>
                      </div>
                    </v-col>
                  </v-row>

                  
                  <v-row>
                    <v-col cols="12">
                      <div class="d-flex">
                        <v-card text="Card3" class="flex-grow-1 mr-2">
                          
                        </v-card>
                        <v-card text="Card3" class="flex-grow-1 ml-2">
                          
                        </v-card>
                        <v-card text="Card3" class="flex-grow-1 ml-2">
                          
                        </v-card>

                        <v-card text="Card3" class="flex-grow-1 ml-2">
                          
                        </v-card>
                      </div>
                    </v-col>
                  </v-row>

                </v-container>
              </v-card>
            </v-dialog>         
        </template>
        </v-banner>
    </div>
  </template>
  <script setup lang="ts">
  import { ref } from 'vue';

  const dialog = ref(false);
  
  </script>

<style>

.cookie-banner {
    position: absolute;
    z-index: 10;
    pointer-events: auto;
  }

</style>
