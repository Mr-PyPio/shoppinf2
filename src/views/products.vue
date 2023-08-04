<template>
<Default>
    <div id="products" class="content">
        <SwiperTools :swiperData="bannerImg" pagination="true"></SwiperTools>

        <div class="productText">
            <p class="name">長袖 簡約 シンプル 春秋 ハイネック プルオーバー ボーダー Ｔシャツ ポロシャツ ファッション トップス</p>
            <p class="listPrice">
                <span>参考価格</span>
                <span>￥7,496 税込</span>
            </p>
            <p class="dpPrice">
                <span>販売価格</span>
                <span>￥1,899 税込</span>
            </p>
        </div>

        <OptionElement :data="data"></OptionElement>

        <el-affix :offset="42" style="margin-top: 25px">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" stretch="true">
                <el-tab-pane label="商品詳細" name="first">
                    <Message></Message>
                </el-tab-pane>
                <el-tab-pane label="レビュー（）" name="second">
                    <Reviews></Reviews>
                </el-tab-pane>
                <el-tab-pane label="おすすめ商品" name="third">
                    <Recommend></Recommend>
                </el-tab-pane>
            </el-tabs>
        </el-affix>
    </div>
</Default>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SwiperTools from 'components/tool/swiperTools.vue'
import OptionElement from 'components/products/optionElement.vue'
import Message from 'components/products/productMessage.vue'
import Reviews from 'components/products/productReviews.vue'
import Recommend from 'components/products/productRecommend.vue'

import Default from 'components/tool/default.vue'
export default {
    name: '_products',
    components: {
        SwiperTools,
        OptionElement,
        Default,
        Reviews,
        Message,
        Recommend
    },
    setup() {
        const activeName = ref('first')
        const handleClick = () => {

        }
        const bannerImg = ref([
            {
                key: 1,
                image: require('assets/image/indexBanner.gif'),
                link: 'html',
            },
            {
                key: 2,
                image: require('assets/image/indexBanner.gif'),
                link: 'html',

            },
            {
                key: 3,
                image: require('assets/image/indexBanner.gif'),
                link: 'html',

            },
        ])

        const router = useRouter()
        const productId = router.currentRoute.value.query.id

        return {
            bannerImg,
            productId,
            activeName,
            handleClick
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
.el-tabs__nav-wrap::after{

}
</style>