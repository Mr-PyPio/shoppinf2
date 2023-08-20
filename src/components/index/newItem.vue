<template>
    <div id="newItems">
        <h2>NEW ARRIVAL</h2>
        <div class="productList">
            <ProductItem :productList="productList"></ProductItem>
        </div>
    </div>
</template>

<script>
import ProductItem from 'components/tool/productItem.vue'
import {ref} from 'vue'
export default {
    name:'_newItems',
    components: {
        ProductItem
    },
    props: {
        newProducts: {
            type: Array,
            default: (() => [])
        }
    },  
    setup(props) {
        const productList = ref(props.newProducts)

        return {
            productList
        }
    },
}
</script>

<style lang="less" scoped>
#newItems{
    h2{
        font-size: 24px;
        text-align: center;
        padding: 30px 0 15px;
    }
}
</style>