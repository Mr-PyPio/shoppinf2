<template>
    <div id="top_banner">
        <swiper
            :modules="modules"
            :slides-per-view="1"
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
import {ref} from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, A11y ,Autoplay} from 'swiper/modules';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const bannerImgData = ref([])
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

        const getImgSize = url => {
            let width = window.innerWidth > 750 ? 750 :  window.innerWidth
            return new Promise(resolve => {
                let imgObj = new Image()
                imgObj.src = url
                imgObj.onload = () => {
                    let scale = parseFloat(imgObj.height/imgObj.width)
                    resolve({
                        width: imgObj.width,
                        height: imgObj.height,
                        scale: scale,
                        style: width * scale
                    })
                }
            })
        }
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
}
</script>

<style scoped lang="less">
#top_banner{
    .swiper-wrapper{
        .displayFlex()
    }
}

</style>