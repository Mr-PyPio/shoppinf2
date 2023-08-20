<template>
    <div class="swiper_banner">
        <template v-if="bannerImgData.length > 0">
            <swiper
                :modules="modules"
                :slides-per-view="num"
                :navigation = "navigaShow"
                :pagination = "paginaShow"
                :scrollbar = "scrollShow"
                :loop = "isLoop"
                :space-between = "space_between"
                :autoplay="{
                    delay: 3000,
                    disableOnInteraction: false,
                }"
                ref = 'swiperWrapper'
            >   
                <swiper-slide v-for="item in bannerImgData" :key="item.key">
                    <template v-if="item.link">
                        <a :href="item.link" style="display: block;">
                            <img v-lazy="item.img.url" :alt="item.img.imgMessage.scale"  :style="{ width:'100%', 'aspect-ratio': 1/item.img.imgMessage.scale }">
                            <template v-if="nameHtml && item.name">
                                <div class="bannerName">item.name</div>
                            </template>
                            <template v-if="textHtml && item.desc">
                                <div class="bannerText" v-html="item.desc"></div>
                            </template>
                        </a>
                    </template>
                    <template v-if="!item.link">
                        <div style="display: block;">
                            <img v-lazy="item.img.url" :alt="item.img.imgMessage.scale"  :style="{ width: '100%', 'aspect-ratio': 1 / item.img.imgMessage.scale }">
                            <template v-if="nameHtml && item.name">
                                <div class="bannerName">item.name</div>
                            </template>
                            <template v-if="textHtml && item.desc">
                                <div class="bannerText" v-html="item.desc"></div>
                            </template>
                        </div>
                    </template>

                </swiper-slide>

            </swiper>
        </template>
        <template v-if="!bannerImgData.length && typeSwiper == 'product'">
            <img :src="require('assets/image/defaultImg.gif')" alt=""  class="defaultImg">
        </template>
    </div>
</template>

<script>
import {ref} from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, A11y, Autoplay, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        perviewNum : {
            type: String,
            default: '1'
        },
        navigation: {
            type: String,
            default: ''
        },
        pagination: {
            type: String,
            default: ''
        },
        scrollbar: {
            type: String,
            default: ''
        },
        loop: {
            type: String,
            default: ''
        },
        code: {
            type: String,
            default: ''
        },
        desc: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        spaceBetween: {
            type: String,
            default: '0' 
        },
        swiperData: {
            type: Array,
            default: (() => [])
        },
        type: {
            type: String,
            default:""
        }
    },
    setup(props) {
        const num = ref(props.perviewNum)
        const navigaShow = ref(Boolean(props.navigation))
        const paginaShow = ref(Boolean(props.pagination))
        const scrollShow = ref(Boolean(props.scrollbar))
        const isLoop = ref(Boolean(props.loop))
        const bannerImgData = ref(props.swiperData)
        const textHtml = ref(Boolean(props.desc))
        const nameHtml = ref(Boolean(props.name))
        const space_between = ref(props.spaceBetween)
        const typeSwiper = ref(props.type)

        return{
            num,
            navigaShow,
            paginaShow,
            modules: [Navigation, A11y, Autoplay,Pagination,Scrollbar],
            scrollShow,
            isLoop,
            bannerImgData,
            textHtml,
            nameHtml,
            space_between,
            typeSwiper
        }
    },
}
</script>

<style scoped>
.bannerText{
    font-size: 12px;
    line-height: 1.4em;
    color: #666;
    padding: 0 3px;
}
.bannerName{
    font-size: 13px;
    font-weight: 600;
    color: #222222;
}
.defaultImg{
    width: 100vw;
    height: 100vw;

    @media screen and (min-width: 750px) {
        width: 750px;
        height: 750px;
    }
}
</style>