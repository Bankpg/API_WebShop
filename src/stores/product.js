import { defineStore } from 'pinia'
import axios from "axios"
import { ref, computed } from 'vue'

export const useProductStore = defineStore("useProductStore", () => {
    const product = ref([])
    const men = ref([])
    const women = ref([])
    const jewelery = ref([])
    const electronics = ref([])

    const list_product = computed(() => product.value) //ทั้งหมด
    const load_product = computed(() => product.value.length > 0) //โหลดเสร็จ

    //Api 
    const fetchProduct = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            product.value = response.data
            men.value = response.data.filter(product => product.category === "men's clothing");
            women.value = response.data.filter(product => product.category === "women's clothing");
            jewelery.value = response.data.filter(product => product.category === "jewelery");
            electronics.value = response.data.filter(product => product.category === "electronics");

            console.log("Products : ",product.value)
        } catch (error) {
            console.error(error);
        }
    }
    //Search
    const input = ref('') //เก็บค่า input ในช่องSearch
    const search_product = computed(() => {
        if (input.value.length < 3) return product.value

        return product.value.filter((prd) => {
            //ให้searchได้ทั้งตัวเล็กตัวใหญ่ ใช้toLowerCase
            if (prd.title.toLowerCase().includes(input.value.toLowerCase()) == false, prd.category.toLowerCase().includes(input.value.toLowerCase()) == false) {
                return false
            } else {
                return prd.title.toLowerCase().includes(input.value.toLowerCase()), prd.category.toLowerCase().includes(input.value.toLowerCase())
            }
        })
    })
    
    return { fetchProduct, product, men, women, jewelery, electronics, search_product, input, list_product, load_product }
})




