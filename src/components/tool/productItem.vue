<template>
    <ul>
        <li v-for="item in data" :key="item.id">
            <a :href="'/products.html?id='+ item.id">
                <div class="img">
                    <img v-lazy="item.product_img? item.product_img.url:''" alt="" :style="{'width':'100%','aspect-ratio': item.product_img? item.product_img.imgMessage.scale : 1}">
                </div>
                <p class="name" :class="overflwTezt" v-if="showNameNow" :style="nameStyleNow">{{item.name}}</p>
                <p class="price" :style="priceStyleNow">￥{{item.price}}</p>
                <p class="reviews" v-if="showReviewNow" :style="reviewsStyleNow">1</p>
                <slot :items ="item"></slot>
            </a>
        </li>
    </ul>
</template>

/* 
    传参：
        overflwTezt ---- 文案溢出处理，传展示多少行；
        showNameNow ---- 是否展示产品名称，传Boolean;
        nameStyleNow ---- 自定义名称样式，例：nameStyleNow="color:#000;font-size:12px;";
        priceStyleNow ---- 自定义价格样式，例：priceStyleNow="color:#000;font-size:12px;";
        reviewsStyleNow ---- 自定义评论样式，例：reviewsStyleNow="color:#000;font-size:12px;"; 
        showReviewNow ---- 是否展示评论,传Boolean
        插槽 ---- 已传产品数据给父组件
 */

<script>
import {ref,computed} from 'vue'
export default {
    props: {
        productList: {
            type: Array,
            default: (() => [])
        },
        overflowText: {
            type: Number,
            default: 1
        },
        showName: {
            type: Boolean,
            default: true
        },
        showReview: {
            type: Boolean,
            default: false
        },
        nameStyle: {
            type: String,
            default: ''
        },
        priceStyle: {
            type: String,
            default: ''
        },
        reviewsStyle: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const data = ref(props.productList)
        const showNameNow = ref(props.showName)
        const showReviewNow = ref(props.showReview)
        const nameStyleNow = ref(props.nameStyle)
        const priceStyleNow = ref(props.priceStyle)
        const reviewsStyleNow = ref(props.reviewsStyle)

        const overflwTezt = computed(() => `overflwText${props.overflowText}`)

        return {
            data,
            overflwTezt,
            showNameNow,
            showReviewNow,
            nameStyleNow,
            priceStyleNow,
            reviewsStyleNow
        }
    },
}
</script>

<style lang="less" scoped>
ul{
    padding: 0 12px;
    .displayFlex();
    flex-wrap: @flex_wrap;
    justify-content: space-between;

    @media screen and (min-width: 750px) {
        padding: 0 32px !important
    }

    li{
        width: 46vw;
        margin-bottom: 15px;

        @media screen and (min-width: 750px) {
            width: 320px;
        }

        a{
            display: block;
            width: 46vw;

            @media screen and (min-width: 750px) {
                width: 320px;
            }

            .img{
                width: 46vw;
                height: 46vw;

                @media screen and (min-width: 750px) {
                    width: 320px;
                    height: 320px;
                }
            }

            .name{
                font-size: 12px;
                color: #3a3a3a;
                margin: 8px 0;
                line-height: 1.3em;
            }

            .price{
                font-size: 14px;
                color: #3a3a3a;
                font-weight: 600;
                padding-bottom: 8px;
            }
        }
    }
}
</style>