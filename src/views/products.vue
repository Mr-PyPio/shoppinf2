<template>
    <div id="products" class="content">
        <SwiperTools :swiperData="bannerImg" pagination="true"></SwiperTools>
        {{ productId }}
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SwiperTools from 'components/tool/swiperTools.vue'
export default {
    name: '_products',
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

        const router = useRouter()
        const productId = router.currentRoute.value.query.id

        return {
            bannerImg,
            productId
        }
    },
}
</script>

<style lang="less" scoped>

</style>