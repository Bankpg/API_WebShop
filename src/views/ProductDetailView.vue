<template>
    <v-container>
        <v-row
            style="border-radius: 20px; background-color: rgba(255, 255, 255, 0.415); backdrop-filter: blur(20px); min-height: 50vh; min-width: 300px;">
            <v-col>
                <v-skeleton-loader v-if="!load_product" type="image,image,image" min-width="300px"
                    style="background-color: transparent;"></v-skeleton-loader>
                <v-container v-else class="d-flex flex-wrap align-content-center rounded-lg"
                    style="padding: 40px; background-color: white; height: 100%; ">
                    <v-img class="mt-auto mx-auto" :src="product.image"
                        style=" min-width: 200px; max-height: 300px; "></v-img>
                </v-container>
            </v-col>

            <v-col cols="7">
                <v-skeleton-loader v-if="!load_product"
                    type="list-item-three-line,list-item-three-line,list-item-three-line,list-item-three-line,table-tfoot"
                    style="background-color: transparent;">
                </v-skeleton-loader>

                <div v-else class=" d-flex flex-column ga-5" style="min-width: 300px; padding-top: 30px; height: 100%;">
                    <div>
                        <p style="font-size: 2em; font-weight: bolder; line-height: normal;">{{ product.title }}</p>
                        <p style="font-size: 1.2em; ">{{ product.category }}</p>
                    </div>
                    <p style="opacity: 0.5;;">{{ product.description }}</p>
                    <!--rating-->
                    <div class="d-flex">
                        <v-rating :model-value="product.rating.rate" color="orange" density="compact" half-increments
                            readonly size="largh"></v-rating>
                        <p class="text-lg align-self-center">({{ product.rating.rate }})</p>
                        <v-spacer></v-spacer>
                        <p>{{ product.rating.count }} Rating</p>
                    </div>
                    <v-row class="ma-0">
                        <v-btn-group class="mt-auto" rounded="xl" style="height: 40px;">
                            <v-btn v-if="amount <= 1" variant="outlined" :ripple="false">-</v-btn>
                            <v-btn v-else variant="outlined" @click="decre_amount">-</v-btn>
                            <v-btn variant="outlined" :ripple="false" >{{ amount }}</v-btn>
                            <v-btn variant="outlined" @click="incre_amount">+</v-btn>
                        </v-btn-group>
                        <v-spacer></v-spacer>
                        <p
                            style="font-size: 3em; font-weight: bold; color: white; text-shadow: 0px 0px 2px black; text-align: end;">
                            ${{ product.price }}
                        </p>
                    </v-row>

                    <v-btn @click="cart_store.add_cart(product.id, product.price, amount)" prepend-icon="mdi-cart-plus"
                        variant="outlined">
                        Add to cart
                    </v-btn>

                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute()
console.log("Product ID :", route.params.id)

const product = ref({})
const amount = ref(1)
const incre_amount = () => {
    amount.value++
}
const decre_amount = () => amount.value--

const load_product = ref(false)
//Get API ของProduct แต่ละตัว
const product_detail = async () => {
    await axios.get(`https://fakestoreapi.com/products/${route.params.id}`)
        .then((response) => {
            product.value = response.data
            console.log(product.value)
            console.log(product.value.rating.rate)
            load_product.value = true
        }).catch((err) =>
            console.log(err)
        )
}
//cart
import { useCartStore } from '../stores/cart'
const cart_store = useCartStore()

onMounted(() => product_detail())

</script>

<style scoped></style>