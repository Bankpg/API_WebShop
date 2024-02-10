<template>
    <v-container v-if="cart.length == 0" class="d-flex justify-center align-center flex-column rounded-xl"
        style="background-color: rgba(255, 255, 255, 0.415); backdrop-filter: blur(20px); min-height: 100vh; min-width: 300px; font-size: 30px;">
        <v-icon icon="mdi-cart-variant"></v-icon>
        <p>ไม่มีสินค้าในตะกร้า</p>
    </v-container>
    <v-container v-else
        style="padding: 30px; border-radius: 20px; background-color: rgba(255, 255, 255, 0.415); backdrop-filter: blur(20px); min-height: 100vh; min-width: 300px;">
        <v-row class="d-flex justify-center">
            <v-col cols="4" class="px-0"
                style="display: flex; flex-direction: column; min-width: 200px; align-items: center;">
                <v-img src="https://img2.pic.in.th/pic/Wavy_Tech-17_Single-04.png" width="300px"></v-img>
                <p style="font-size: 30px; font-weight: bold; color: white; text-shadow: 0 0 5px black;">ราคารวม ${{
                    cart_store.total.toFixed(2) }}</p>
                <v-row class="mt-5 ga-5">
                    <v-btn @click="" color="green"><v-icon icon="mdi-checkbox-marked-circle-outline"></v-icon>checkout
                    </v-btn>
                    <v-btn @click="cart_store.clear_cart" color="red"><v-icon icon="mdi-cancel"></v-icon> clear</v-btn>
                </v-row>
            </v-col>

            <v-col cols="auto" class="ps-0" style="width: 700px;">
                <v-card class="my-5 rounded-xl" color="white" v-for="(item, index) in cart" key="index" height="150px"
                    style="background-color: transparent; padding: 10px;">
                    <v-row style="height: 100%; margin: 0px;">
                        <!--Img-->
                        <v-col cols="3" class="d-flex justify-center" style="background-color: white; padding: 10px; ">
                            <v-img class="mx-auto" :src="item.product.image" style="max-height: 100px;"></v-img>
                        </v-col>
                        <!--Detail-->
                        <v-col cols="7" class="pa-0">
                            <v-card-title class="ps-0 py-2 font-weight-bold">{{ item.product.title }}</v-card-title>

                            <p style="font-size: 25px; font-weight: normal;">${{ cart[index].total_product.toFixed(2) }}</p>

                            <v-btn-group class="mt-auto" rounded="xl" style="height: 40px;">
                                <v-btn v-if="cart[index].amount <= 1" variant="outlined" size="x-small"
                                    :ripple="false">-</v-btn>
                                <v-btn v-else variant="outlined" size="x-small"
                                    @click="cart_store.decrement_amount(index)">-</v-btn>
                                <v-btn variant="outlined" :ripple="false">{{ cart[index].amount }}</v-btn>
                                <v-btn variant="outlined" size="x-small"
                                    @click="cart_store.increment_amount(index)">+</v-btn>
                            </v-btn-group>
                        </v-col>
                        <!--Action-->
                        <v-col cols="2" class="d-flex justify-center my-auto">
                            <v-btn icon="mdi-cart-minus" size="x-large" color="red" min-width="64px"
                                @click="cart_store.remove_cart(index)"></v-btn>
                        </v-col>
                    </v-row>

                </v-card>
            </v-col>

        </v-row>
    </v-container>
</template>
<script setup>
import { ref, computed } from 'vue'
//useProductStore
import { useProductStore } from '../stores/product'
const product_store = useProductStore()

//useCartStore
import { useCartStore } from '../stores/cart';
const cart_store = useCartStore()
const cart = computed(() => cart_store.cart_previews)
console.log("Cart : ", cart.value)
</script>