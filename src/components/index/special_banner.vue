<template>
    <div id="special_banner" style="margin: 16px 12px;width: calc(100% - 24px)" :style="{'height': height??'auto'}">
        <swiper
            :modules="modules"
            :slides-per-view="2"
            :space-between="10"
            navigation
            autoHeight
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
import { defineComponent,ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, A11y, Autoplay } from 'swiper/modules';

export default defineComponent({
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        'swiperData' : {
            type: Array,
            default: (() => {[]})
        },
        'defaultHeight' : {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const bannerImgData = ref(props.swiperData)

        const height = ref(props.defaultHeight)

        return {
            bannerImgData,
            modules: [Navigation, A11y, Autoplay],
            height
        }
    },
})
</script>

