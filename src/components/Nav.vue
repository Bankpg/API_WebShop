<template>
    <v-toolbar
        style="background-color: rgba(60, 60, 60, 0.14); color: white; backdrop-filter: blur(20px); position: fixed; z-index: 1000; text-shadow: 0 0 5px black;">
        <v-toolbar-title style="font-size: 25px; font-weight: bolder;">FakeStore</v-toolbar-title>
        <v-toolbar-items>
            <v-btn to="/" icon="mdi-home"></v-btn>
            <v-btn to="/product">Products</v-btn>
            <v-btn to="/cart">
                <v-badge :content="cart_store.cart.length" class="pa-6">
                    <v-icon icon="mdi-cart-variant" size="x-large"></v-icon>
                </v-badge>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>
<script setup>
//useCartStore
import { useCartStore } from '../stores/cart';
const cart_store = useCartStore()

</script>