<template>
    <v-container>
        <v-row class="ga-5 justify-center">
            <!--LEFT-->
            <v-col class="rounded-lg pa-5"
                style="min-width: 200px; background-color: rgba(255, 255, 255, 0.415); backdrop-filter: blur(20px); ">

                <!--Search-->
                <v-card class="mx-auto" color="grey-lighten-3" min-width="50px">
                    <v-text-field density="compact" variant="solo" label="Search product" prepend-inner-icon="mdi-magnify"
                        single-line hide-details v-model="store.input"></v-text-field>
                </v-card>
            </v-col>

            <!--RIGHT-->
            <v-col cols="9" class="rounded-lg pa-5 d-flex flex-column justify-center" v-if="search.length == 0"
                style="min-width: 400px; background-color: rgba(255, 255, 255, 0.415); backdrop-filter: blur(20px); font-size: 30px; text-align: center; height: 100vh;">
                <v-icon class="mx-auto" icon="mdi-shopping-search-outline"></v-icon>
                <p>ไม่พบสินค้า</p>
            </v-col>
            <v-col cols="9" class="rounded-lg pa-5" v-else
                style="min-width: 400px; background-color: rgba(255, 255, 255, 0.415); backdrop-filter: blur(20px);">
                <v-row class="ga-5 mt-0 mb-0 justify-center">
                    <v-card :to="`/product/${product.id}`" class="rounded-lg" width="100%" min-width="100px"
                        max-width="180px" v-for="(product, index) in search" :key="index">
                        <!--Image-->
                        <div class="d-flex justify-center pa-5" style="height: 60%;">
                            <v-img :src="product.image" max-height="100px" width="100%" color="white"></v-img>
                        </div>
                        <!--TEXT-->
                        <div class="d-flex flex-column justify-end pa-3"
                            style="height: 40%; background-color: rgba(0, 0, 0, 0.030); ">
                            <!--Name-->
                            <v-card-title class="pa-0">{{ product.title }}</v-card-title>
                            <p>{{ product.category }}</p>
                            <!--Price-->
                            <h2 class="font-weight-bold">${{ product.price }}</h2>
                            <!--rating-->
                            <div class="d-flex justify-end">
                                <v-rating :model-value="product.rating.rate" color="amber" density="compact" half-increments
                                    readonly size="x-small"></v-rating>
                                <p class="text-caption align-self-end">({{ product.rating.rate }})</p>
                            </div>
                        </div>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { computed, ref } from "vue";
import { useProductStore } from "../stores/product";
const store = useProductStore();

const list = computed(() => store.list_product);
const search = computed(() => store.search_product);
</script>

<style scoped></style>