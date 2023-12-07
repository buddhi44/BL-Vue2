<script setup lang="ts">
import { ref } from "vue";
import ProfitExpanse from "./widgets/ProfitExpense.vue";
import TrafficDistribution from "./widgets/TrafficDistribution.vue";
import ProductSales from "./widgets/ProductSales.vue";
import carousel_img1 from '@/assets/images/Carousel-img-1.png'
import carousel_img2 from '@/assets/images/Carousel-img-2.png'

const colors =[
          '#0085DB',
          'warning',
          
        ];
const images= [
            carousel_img1,
            carousel_img2
        ];
</script>


<template>
        <v-row>
            <v-col cols="12">
                
                <v-carousel
                    cycle
                    height="400"
                    hide-delimiter-background
                    show-arrows="hover"
                >
                    <v-carousel-item
                    v-for="(slide, i) in images"
                    :key="i"
                    >
                    <v-sheet
                        :color="colors[i]"
                        height="100%"
                    >
                        <div class="d-flex fill-height justify-center align-center">
                            <div class="text-h2">
                                <img :src="images[i]" class="carousel-img" style="height:100%;width:100%" />
                            </div>
                        </div>
                    </v-sheet>
                    </v-carousel-item>
                </v-carousel>

            </v-col>
            <v-col cols="12" sm="12" lg="8">
                <ProfitExpanse />
            </v-col>
            <v-col cols="12" sm="12" lg="4">
                <div class="mb-6">
                    <TrafficDistribution/>
                </div>
                <div>
                    <ProductSales/>
                </div>
            </v-col>
            <v-col class="text-center mt-2">
                <p class="text-muted">Design and Developed by <a flat variant="text" href="https://www.bluelotus360.com/" target="_blank" class="pl-1 text-primary">Blue lotus 360</a></p>
            </v-col>
        </v-row>
    
</template>