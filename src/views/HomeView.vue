<template>
  <header>
    <v-row class="justify-center ">
      <v-col cols="6" class="">
        <v-img class="mx-auto" src="https://img5.pic.in.th/file/secure-sv1/-removebg.png" max-height="500px"
          max-width="800px" min-width="400px" cover=""></v-img>
      </v-col>
      <v-col class="ms-6 d-flex justify-center flex-column">
        <h1>FAKE STORE</h1>
        <h1>SHOP</h1>

        <a href="https://fakestoreapi.com/">fakestoreapi.com</a>
      </v-col>

    </v-row>

  </header>
  <div class="d-flex flex-column ga-5">
    <v-container>
      <p class="d-flex position-relative ms-5"
        style="color: white; bottom: -20px; z-index: 100; font-size: 35px; font-weight: bold; text-shadow: 0 0 5px black;">
        Top rate</p>
      <v-slide-group class="pa-4 rounded-xl" show-arrows
        style="max-height: 300px; background-color: rgba(255, 255, 255, 0.415); backdrop-filter: blur(20px);">
        <div class="d-flex ga-5 pa-2">
          <v-slide-group-item v-for="(product, index) in list" :key="index">
            <v-card :to="`/product/${product.id}`" class="rounded-lg" width="100%" min-width="100px" max-width="180px"
              v-if="product.rating.rate > 4">
              <!--Image-->
              <div class="d-flex justify-center pa-5" style="height: 60%;">
                <v-img :src="product.image" max-height="100px" width="100%" color="white"></v-img>
              </div>
              <!--TEXT-->
              <div class="d-flex flex-column justify-end pa-2"
                style="height: 40%; background-color: rgba(0, 0, 0, 0.030); ">
                <!--Name-->
                <v-card-title class="pa-0">{{ product.title }}</v-card-title>
                <!--Price-->
                <h2 class="font-weight-bold">${{ product.price }}</h2>
                <!--rating-->
                <div class="d-flex justify-end">
                  <v-rating :model-value="product.rating.rate" color="amber" density="compact" half-increments readonly
                    size="x-small"></v-rating>
                  <p class="text-caption align-self-end">({{ product.rating.rate }})</p>
                </div>
              </div>
            </v-card>
          </v-slide-group-item>
        </div>
      </v-slide-group>
    </v-container>

    <div >
        <v-row class="text-center ma-auto align-center" style="font-size: 30px; color: white; text-shadow: 0 0 10px black;  background-color: rgba(255, 255, 255, 0.415); backdrop-filter: blur(20px); height: 200px;">
          <v-col cols="4">
            <v-icon size="x-large" icon="mdi-truck-delivery"></v-icon>
            <p>ฟรีค่าจัดส่ง</p>
          </v-col>

          <v-col cols="4">
            <v-icon size="x-large" icon="mdi-credit-card-fast-outline"></v-icon>
            <p>ขำระผ่านบัตรเครดิต</p>
          </v-col>

          <v-col cols="4">
            <v-icon size="x-large" icon="mdi mdi-cash-multiple"></v-icon>
            <p>เก็บเงินปลายทาง</p>
          </v-col>
        </v-row>
    </div>
  </div>

  <!--Slide-->
</template>
<script setup>
import { computed } from "vue";
import { useProductStore } from "../stores/product";
const store = useProductStore();
const list = computed(() => store.list_product);

</script>

<style scoped>
h1 {
  font-size: clamp(5rem, 2vw, 5rem);
  font-weight: bold;
  color: white;
  line-height: normal;
}
</style>