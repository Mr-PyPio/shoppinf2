<template>
    <div id="top_banner">
        <swiper
            :modules="modules"
            :slides-per-view="num"
            :navigation = "navigaShow"
            :pagination = "paginaShow"
            :scrollbar = "scrollShow"
            :loop = "isLoop"
            :autoplay="{
                delay: 3000,
                disableOnInteraction: false,
            }"
        >
            <swiper-slide v-for="item in bannerImgData" :key="item.key">
                <a :href="item.link">
                    <img v-lazy="item.image" :alt="item.imageSize.scale"  style="width: 100%;">
                </a>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import {ref} from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, A11y ,Autoplay,Pagination,Scrollbar} from 'swiper/modules';
import { getImgSize } from 'assets/js/common.js'
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
            type: Number,
            default: 1
        },
        navigation: {
            type: String,
            default: ''
        },
        swiperData: {
            type: Array,
            default: (() => [])
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
        }
    },
    setup(props) {
        const num = ref(props.perviewNum)
        const navigaShow = ref(Boolean(props.navigation))
        const paginaShow = ref(Boolean(props.pagination))
        const scrollShow = ref(Boolean(props.scrollbar))
        const isLoop = ref(Boolean(props.loop))

        const bannerImgData = ref([])

        const data = ref(props.swiperData)

        data.value.forEach(async item => {
            item.imageSize = await getImgSize(item.image)
            bannerImgData.value.push(item)
        });

        return{
            num,
            navigaShow,
            paginaShow,
            modules: [Navigation, A11y, Autoplay,Pagination,Scrollbar],
            scrollShow,
            isLoop,
            bannerImgData
        }
    },
}
</script>