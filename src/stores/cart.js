import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
//useProductStore
import { useProductStore } from './product'

export const useCartStore = defineStore('useCartStore', () => {
    const cart = ref([])
    
    const add_cart = (id, price, amount) => {
        const data = {
            id,
            price,
            amount
        }

        const findId = cart.value.find(e => e.id == data.id)
        if (findId) {
            const findIndexProduct = cart.value.findIndex(e => e.id == data.id)
            cart.value[findIndexProduct].amount = cart.value[findIndexProduct].amount + amount
            saveToLocalStorage()
            alert_add_cart()
        } else {
            cart.value.push(data)
            saveToLocalStorage()
            alert_add_cart()
        }
    }

    const saveToLocalStorage = () => {
        localStorage.setItem('cart', JSON.stringify(cart.value))
    }

    const loadFromLocalStorage = () => {
        if (localStorage.getItem('cart')) {
            cart.value = JSON.parse(localStorage.getItem('cart'))
        }
    }
    //
    const cart_previews = computed(() => {
        const product_store = useProductStore()

        return cart.value.map((prd, i) => {
            const findIndexProduct = product_store.product.findIndex(e => e.id == prd.id)

            return {
                product: product_store.product[findIndexProduct],
                amount: cart.value[i].amount,
                total_product: product_store.product[findIndexProduct].price * cart.value[i].amount
            }
        })
    })

    const total = computed(() => {
        return cart.value.reduce((sum, prd) => sum + prd.price * prd.amount, 0)
    })

    const alert_add_cart = () => {
        Swal.fire({
            icon: 'success',
            title: 'เพิ่มสินค้าเรียบร้อยแล้ว',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const increment_amount = (i) => {
        cart.value[i].amount += 1
        saveToLocalStorage()
    }

    const decrement_amount = (i) => {
        cart.value[i].amount -= 1
        saveToLocalStorage()

        if (cart.value[i].amount == 0) {
            cart.value.splice(i, 1)
            saveToLocalStorage()
        }
    }

    const remove_cart = (i) => {
        cart.value.splice(i, 1)
        saveToLocalStorage()
    }

    const clear_cart = () => {
        cart.value = []
        saveToLocalStorage()
    }

    return { cart, add_cart, loadFromLocalStorage, cart_previews, increment_amount, decrement_amount, remove_cart, clear_cart, total }
})