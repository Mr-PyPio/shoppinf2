<template>
    <div id="home">
        <Header></Header>
        <TopBanner></TopBanner>
        <SpecialBanner></SpecialBanner>
        <PickUpItem></PickUpItem>
        <SearchKeys></SearchKeys>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import Header from 'components/header.vue'
import TopBanner from 'components/index/top_banner.vue'
import SpecialBanner from 'components/index/special_banner.vue'
import PickUpItem from 'components/index/pick_up_items.vue'
import SearchKeys from 'components/index/search_keys.vue'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default defineComponent({
    name: 'home_',
    components: {
        Header,
        TopBanner,
        SpecialBanner,
        PickUpItem,
        SearchKeys
    },
    setup() {
        return {
            
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