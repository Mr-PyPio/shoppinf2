<template>
    <Default>
        <div id="home" class="content">
        <el-skeleton style="width: 100%" :loading="loading" animated :throttle="200">
        <template #template>
            <el-skeleton-item variant="image" class="product_img_ver" />
            <el-skeleton-item variant="image" style="width: 48%;aspect-ratio: 1/0.7;display: inline-block;height: auto;text-align: center;" />
            <el-skeleton-item variant="image"  style="width: 48%;aspect-ratio: 1/0.7;display: inline-block;height: auto;text-align: center;"/>
            <el-skeleton-item variant="text"  style="width: 48%;height: 60px;display: inline-block;"/>
            <el-skeleton-item variant="text"  style="width: 48%;height: 60px;display: inline-block;"/>
            <h2 style="font-size: 24px;text-align: center;padding: 20px 0 12px;font-weight: 500;">PICK UP ITEM</h2>
            <el-skeleton-item variant="image"  style="width: 25%;aspect-ratio: 1;display: inline-block;height: auto;text-align: center;"/>
            <el-skeleton-item variant="image" style="width: 48%;aspect-ratio: 1;display: inline-block;height: auto;text-align: center;" />
            <el-skeleton-item variant="image"  style="width: 25%;aspect-ratio: 1;display: inline-block;height: auto;text-align: center;"/>
            <h2 style="font-size: 24px;text-align: center;padding: 20px 0 12px;font-weight: 500;">TREND KEYWORD</h2>
            <div style="display: flex;justify-content: center;flex-wrap: wrap;">
                <el-skeleton-item variant="text"  style="width: 70px;height: 32px;display: inline-block;"/>
                <el-skeleton-item variant="text"  style="width: 90px;height: 32px;display: inline-block;"/>
                <el-skeleton-item variant="text"  style="width: 90px;height: 32px;display: inline-block;"/>
                <el-skeleton-item variant="text"  style="width: 70px;height: 32px;display: inline-block;"/>
                <el-skeleton-item variant="text"  style="width: 90px;height: 32px;display: inline-block;"/>
                <el-skeleton-item variant="text"  style="width: 70px;height: 32px;display: inline-block;"/>
            </div>
            <h2 style="font-size: 24px;text-align: center;padding: 20px 0 12px;font-weight: 500;">RANKING</h2>
            <div style="display: flex;justify-content: center;flex-wrap: wrap;">
                <el-skeleton-item variant="image"  style="width: 48%;aspect-ratio: 1;height: auto;display: inline-block;text-align: center;"/>
                <el-skeleton-item variant="image"  style="width: 48%;aspect-ratio: 1;height: auto;display: inline-block;text-align: center;"/>
                <el-skeleton-item variant="image"  style="width: 48%;aspect-ratio: 1;height: auto;display: inline-block;text-align: center;"/>
                <el-skeleton-item variant="image"  style="width: 48%;aspect-ratio: 1;height: auto;display: inline-block;text-align: center;"/>
                <el-skeleton-item variant="image"  style="width: 48%;aspect-ratio: 1;height: auto;display: inline-block;text-align: center;"/>
                <el-skeleton-item variant="image"  style="width: 48%;aspect-ratio: 1;height: auto;display: inline-block;text-align: center;"/>
            </div>
        </template>
        <template #default>
            <div id="top_banner" v-if="topBanner.length > 0">
                <SwiperTools  pagination="true" code="index_top" :swiperData="topBanner"></SwiperTools>
            </div>
            <div id="special_banner" style="margin: 16px 12px;width: calc(100% - 24px)" v-if="specialBanner.length > 0">
                <SwiperTools perviewNum="2"  navigation="true" desc="true" :swiperData="specialBanner" spaceBetween="10"></SwiperTools>
            </div>
            <template v-if="pickUpData.length > 0">
                <PickUpItem :pickUpData = "pickUpData"></PickUpItem>
            </template>
            <template v-if="keyWords.length > 0">
                <SearchKeys :keyWords="keyWords"></SearchKeys>
            </template>
            <template v-if="rankingProduct.length > 0">
                <Ranking :productData="rankingProduct"></Ranking>
            </template>
            <template v-if="categoryData.length  > 0">
                <CategoryImg :categoryData = "categoryData"></CategoryImg>
            </template>
            <template v-if="newProducts.length > 0">
                <NewItem :newProducts="newProducts"></NewItem>
            </template>
            <template v-if="blofData.length > 0">
                <SpecialMessage :blofData="blofData"></SpecialMessage>
            </template>
        </template>
        </el-skeleton>
        </div>
    </Default>
</template>

<script>
import {defineComponent,ref, defineAsyncComponent } from 'vue'
import Default from 'components/tool/default.vue'
// const Default = defineAsyncComponent(() => import('components/tool/default.vue'))
const PickUpItem = defineAsyncComponent(() => import('components/index/pick_up_items.vue'))
const SearchKeys = defineAsyncComponent(() => import('components/index/search_keys.vue'))
const Ranking = defineAsyncComponent(() => import('components/index/ranking.vue'))
const CategoryImg = defineAsyncComponent(() => import('components/index/categoryImg.vue'))
const NewItem = defineAsyncComponent (()  => import('components/index/newItem.vue'))
const SpecialMessage = defineAsyncComponent(() => import('components/index/special_message.vue'))
const SwiperTools = defineAsyncComponent(() => import('components/tool/swiperTools.vue'))
import { getBannerDetail, getCatalogDetail } from 'assets/js/common.js'

export default defineComponent({
    name: 'home_',
    components: {
        PickUpItem,
        SearchKeys,
        Ranking,
        CategoryImg,
        NewItem,
        SpecialMessage,
        Default,
        SwiperTools
    },
    setup() {
        const loading = ref(true)
        const topBanner = ref([])
        const specialBanner = ref([])
        const pickUpData = ref([])
        const keyWords = ref([])
        const rankingProduct = ref([])
        const categoryData = ref([])
        const newProducts = ref([])
        const blofData = ref([])
        const init =async () => {
            const data1 = await getBannerDetail('index_top')
            if (data1) {
                topBanner.value = JSON.parse(data1.detail)
            }
            const specialData = await getBannerDetail('index_special')
            if (specialData) {
                specialBanner.value = JSON.parse(specialData.detail)
            }

            const pickData = await getCatalogDetail('index_pickup')
            if (pickData) {
                pickUpData.value = pickData.productList
            }

            const keyData = await getBannerDetail('index_keyWords')
            if (keyData) {
                keyWords.value = JSON.parse(keyData.detail)
            }
            const rankData = await getCatalogDetail('index_ranking', 10)
            if (rankData) {
                 rankingProduct.value = rankData.productList
            }
            loading.value = false

            const cateData = await getBannerDetail('index_category')
            if (cateData) {
                const data = JSON.parse(cateData.detail)
                let cateNum = 0
                let dataNum = 0
                categoryData.value[0] = []
                while (dataNum < data.length) {
                    if (dataNum % 3 == 0 && dataNum > 0) {
                        cateNum++
                        categoryData.value[cateNum] = []
                    }
                    categoryData.value[cateNum].push(data[dataNum])
                    dataNum ++ 
                }
            }
            const newData = await getCatalogDetail('index_New', 10)
            if (newData) {
                newProducts.value = newData.productList
            }

            const blogData = await getBannerDetail('index_blog')
            if (blogData) {
                blofData.value = JSON.parse(blogData.detail)
            }


        }
        init()

        return {
            topBanner,
            specialBanner,
            pickUpData,
            rankingProduct,
            categoryData,
            newProducts,
            blofData,
            keyWords,
            loading
        }
    }
})
</script>

<style lang="less">
    .swiper-button-prev:after, .swiper-rtl .swiper-button-next:after {
        color: #fff;
    }
    .swiper-button-next:after, .swiper-rtl .swiper-button-prev:after{
         color: #fff;
    }
    .product_img_ver{
        width: 100vw;
        height: 125vw;

        @media screen and (min-width: 750px) {
            width: 750px;
            height: 750px;
        }
    }
</style>