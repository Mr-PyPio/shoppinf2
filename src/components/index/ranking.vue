<template>
    <div id="ranking">
        <h2>RANKING</h2>
        <div class="productList">
            <ProductItem :productList="productList" :overflowText="2"></ProductItem>
        </div>
    </div>
</template>

<script>
import ProductItem from 'components/tool/productItem.vue'
import {ref} from 'vue'
export default {
    name: '_ranking',
    components: {
        ProductItem
    },
    props: {
        productData: {
            type: Array,
            default: (() =>[])
        }
    },
    setup(props) {
        const productList = ref(props.productData)
        return {
            productList,
        }
    },
}
</script>

<style lang="less" scoped>
#ranking{
    h2{
        font-size: 24px;
        text-align: center;
        padding: 30px 0 15px;
    }
}
</style>