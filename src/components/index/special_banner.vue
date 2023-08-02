<template>
    <div id="special_banner" style="margin: 16px 12px;width: calc(100% - 24px)">
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
import { getImgSize } from 'assets/js/common.js'

export default defineComponent({
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const bannerImgData = ref([])
        const bannerImg = ref([
            {
                key: 1,
                image: require('assets/image/special_banner1.png'),
                link: 'html',
            },
            {
                key: 2,
                image: require('assets/image/special_banner2.png'),
                link: 'html',

            },
            {
                key: 3,
                image: require('assets/image/special_banner1.png'),
                link: 'html',

            },
                        {
                key: 3,
                image: require('assets/image/special_banner2.png'),
                link: 'html',

            },
                        {
                key: 3,
                image: require('assets/image/special_banner1.png'),
                link: 'html',

            },
                        {
                key: 3,
                image: require('assets/image/special_banner2.png'),
                link: 'html',

            },
                        {
                key: 3,
                image: require('assets/image/special_banner1.png'),
                link: 'html',

            },
        ])

        bannerImg.value.forEach(async item => {
            item.imageSize = await getImgSize(item.image)
            bannerImgData.value.push(item)
        });
        return {
            bannerImg,
            getImgSize,
            bannerImgData,
            modules: [Navigation, A11y, Autoplay],
        }
    },
})
</script>

