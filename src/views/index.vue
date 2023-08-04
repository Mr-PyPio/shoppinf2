<template>
    <Default>
        <div id="home" class="content">
            <TopBanner></TopBanner>
            <SpecialBanner :swiperData="specialBannerData" :defaultHeight = 'specialBannerDefaultHeight'></SpecialBanner>
            <PickUpItem></PickUpItem>
            <SearchKeys></SearchKeys>
            <Ranking></Ranking>
            <CategoryImg></CategoryImg>
            <NewItem></NewItem>
            <SpecialMessage></SpecialMessage>
        </div>
    </Default>
</template>

<script>
import {defineComponent,ref} from 'vue'
import TopBanner from 'components/index/top_banner.vue'
import SpecialBanner from 'components/index/special_banner.vue'
import PickUpItem from 'components/index/pick_up_items.vue'
import SearchKeys from 'components/index/search_keys.vue'
import Ranking from 'components/index/ranking.vue'
import CategoryImg from 'components/index/categoryImg.vue'
import NewItem from 'components/index/newItem.vue'
import SpecialMessage from 'components/index/special_message.vue'
import Default from 'components/tool/default.vue'
import { getImgSize } from 'assets/js/common.js'

export default defineComponent({
    name: 'home_',
    components: {
        TopBanner,
        SpecialBanner,
        PickUpItem,
        SearchKeys,
        Ranking,
        CategoryImg,
        NewItem,
        SpecialMessage,
        Default
    },
    setup() {
        const specialBannerData = ref([])
        const specialbannerImg  = ref([
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
        
        let first = 1
        const specialBannerDefaultHeight = ref('')
        specialbannerImg.value.forEach(async item => {
            item.imageSize = await getImgSize(item.image)
            specialBannerData.value.push(item)
            if(first == 1) {
                first = 0
                specialBannerDefaultHeight.value = item.imageSize.style
                
            }
        });
        return {
            getImgSize,
            specialBannerData,
            specialBannerDefaultHeight
        }
    }
})
</script>

<style lang="less">
    .swiper-button-prev:after, .swiper-rtl .swiper-button-next:after {
        color: #fff;
    }
    .swiper-button-next:after, .swiper-rtl .swiper-button-prev:after{
         color: #fff;
    }
</style>