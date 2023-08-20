<template>
    <Default>
        <div id="products" v-if="productData" class="content">
            <el-skeleton style="width: 100%" :loading="loading" animated>
                <template #template>
                    <el-skeleton-item variant="image" class="product_img_ver" />
                    <div style="width: 100%;padding: 0 12px;box-sizing: border-box;">
                        <el-skeleton-item variant="text" style="width: 100%;margin: 15px 0;height: 18px;" />
                        <el-skeleton-item variant="text" style="width: 180px;margin: 5px 0;" />
                        <el-skeleton-item variant="text" style="width: 180px;margin: 5px 0;" />
                        <el-skeleton-item variant="text" style="width: 100%;margin: 20px 0 0;height: 40px;" />
                        <el-skeleton-item variant="text" style="width: 100%;margin: 10px 0 25px;height: 40px;" />
                        <el-skeleton-item variant="text" style="width: 100%;height: 1px;background: #ccc;" />
                        <el-skeleton-item variant="text" style="width: 100%;height: 20px;margin: 10px 0;" />
                        <el-skeleton-item variant="text" style="width: 100%;height: 42px;" />
                        <el-skeleton-item variant="text" style="width: 100%;height: 42px;margin-top: 20px;" />
                    </div>
                </template>
                <template #default>
                    <SwiperTools :swiperData="bannerImg" pagination="true" type="product"></SwiperTools>
                    <div class="productText">
                        <p class="name">{{ productData.name }}</p>
                        <p class="listPrice">
                            <span>参考価格</span>
                            <span>￥{{ productData.list_price }} 税込</span>
                        </p>
                        <p class="dpPrice">
                            <span>販売価格</span>
                            <span>￥{{ productData.price }} 税込</span>
                        </p>
                    </div>
                    <template v-if="productOption">
                        <OptionElement :productOption="productOption" :price="productData.price" :productId = "productId" style="margin-bottom: 20px"></OptionElement>
                    </template>
                    <Tabs :tabList = "tabList" class="tabs">
                        <template v-slot:message>
                            <Message :id="productId"></Message>
                        </template>
                        <template v-slot:review>
                            <Reviews></Reviews>
                        </template>
                        <template v-slot:recommend>
                            <Recommend></Recommend>
                        </template>
                    </Tabs>
                </template>
            </el-skeleton>
        </div>
    </Default>
</template>

<script>
import { ref,defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { getProductDetail } from 'assets/js/common.js'
import Default from 'components/tool/default.vue'
import SwiperTools from 'components/tool/swiperTools.vue'
const Reviews = defineAsyncComponent(() => import('components/products/productReviews.vue'))
const Message = defineAsyncComponent(() => import('components/products/productMessage.vue'))
const Recommend = defineAsyncComponent(() => import('components/products/productRecommend.vue'))
const OptionElement = defineAsyncComponent(() => import('components/products/optionElement.vue'))
const Tabs = defineAsyncComponent(() => import('components/tool/tabs.vue'))
export default {
    name: '_products',
    components: {
        SwiperTools,
        OptionElement,
        Default,
        Reviews,
        Message,
        Recommend,
        Tabs
    },
    setup() {
        const loading = ref(true)
        const tabList = ref([
            {
                name: '商品詳細',
                code: 'message'
            },
            {
                name: 'レビュー',
                code: 'review'
            },
            {
                name: 'おすすめ商品',
                code: 'recommend'
            }
        ])
        const bannerImg = ref([])
        const productData = ref([])
        const router = useRouter()
        const productId = ref(router.currentRoute.value.query.id)
        const productOption = ref([])

        const init = async () => {
            const data = await getProductDetail(productId.value)
            console.log(data)
            productData.value = data.data[0]
            if (productData.value.product_img) {
                bannerImg.value = JSON.parse(productData.value.product_img)
                bannerImg.value.forEach(items => {
                    items.img = {
                        imgMessage:  items.imgMessage,
                        url: items.url,
                    }
                })
            }
            productOption.value = data.data[0].option
            loading.value = false
        }
        init()
        return {
            bannerImg,
            productData,
            productOption,
            loading,
            productId,
            tabList
        }
    },
}
</script>

<style lang="less" scoped>
#products {
    .productText{
        padding:  0 12px;

        .name{
            font-size: 16px;
            line-height: 18px;
            margin: 15px 0;
            color: #000;
        }

        .listPrice{
            display: flex;
            padding: 5px 0;
            color: #ccc;
            font-size: 12px;

            span{
                min-width: 90px;
                display: block;

                &:nth-of-type(2) {
                    text-decoration: line-through;
                }
            }
        }

        .dpPrice{
            display: flex;
            padding: 5px 0;
            color: #000;
            font-size: 12px;

            span{
                min-width: 90px;
                display: block;
            }
        }
    }

    .product_img_ver{
        width: 100vw;
        height: 100vw;

        @media screen and (min-width: 750px) {
            width: 750px;
            height: 750px;
        }
    }
}

</style>
<style lang="less">
.el-tabs__nav{
    justify-content: space-between;
    width: 100%;
    .el-tabs__item{
        padding: 0 !important;
        color: #999999;

        &.is-active {
            color: #222;
            font-weight: 600;
        }
    }

    .el-tabs__active-bar{
        background-color: #B78B93;
    }
}

#tabs{
    ul li.tabItems{
        border-bottom: 2px solid #ccc;


        &.active{
            border-bottom: 2px solid #000;
        }
    }
}
</style>