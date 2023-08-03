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
    setup() {
        const productList = ref([
            {
                name: '「人気位商品レトロファッション」大好評ジッパーヒョウ柄綿コート',
                link: 'html',
                img: require('assets/image/Rectangle.png'),
                price: '￥2,660',
                id: '10'
            },
            {
                name: '「人気位商品レトロファッション」大好評ジッパーヒョウ柄綿コート',
                link: 'html',
                img: require('assets/image/Rectangle.png'),
                price: '￥2,660',
                id: '11'
            },
                        {
                name: '「人気位商品レトロファッション」大好評ジッパーヒョウ柄綿コート',
                link: 'html',
                img: require('assets/image/Rectangle.png'),
                price: '￥2,660',
                id: '12'
            },
                        {
                name: '「人気位商品レトロファッション」大好評ジッパーヒョウ柄綿コート',
                link: 'html',
                img: require('assets/image/Rectangle.png'),
                price: '￥2,660',
                id: '13'
            },
                        {
                name: '「人気位商品レトロファッション」大好評ジッパーヒョウ柄綿コート',
                link: 'html',
                img: require('assets/image/Rectangle.png'),
                price: '￥2,660',
                id: '14'
            }])

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