<script setup>
import Nav from './components/Nav.vue'
import { RouterLink, RouterView } from 'vue-router'
import { HalfCircleSpinner } from 'epic-spinners'

import { onMounted } from 'vue';
// useProductStore
import { useProductStore } from './stores/product'
const store = useProductStore()

//useCartStore
import { useCartStore } from './stores/cart';
const cart_store = useCartStore()

onMounted(() => store.fetchProduct())
onMounted(() => cart_store.loadFromLocalStorage())

</script>

<template>
  <v-parallax
    src="https://4kwallpapers.com/images/wallpapers/macos-monterey-stock-blue-light-layers-5k-3840x2160-5898.jpg" cover>
    <header>
      <Nav></Nav>
    </header>

    <body style="margin-top: 80px;">
      <half-circle-spinner v-if="!store.load_product" class="ma-auto" :animation-duration="1000" :size="60"
        color="white" />
      <RouterView v-else />
    </body>
  </v-parallax>
</template>

<style scoped></style>