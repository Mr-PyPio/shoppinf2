<template>
    <div id="products" class="content">
        <SwiperTools :swiperData="bannerImgData" pagination="true"></SwiperTools>
    </div>
</template>

<script>
import {ref} from 'vue'
import SwiperTools from 'components/tool/swiperTools.vue'
export default {
    components: {
        SwiperTools
    },
    setup() {
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

        return {
            bannerImg,
        }
    },
}
</script>

<style lang="less" scoped>

</style>