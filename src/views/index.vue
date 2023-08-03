<template>
    <div id="home" class="content">
        <TopBanner></TopBanner>
        <SpecialBanner></SpecialBanner>
        <PickUpItem></PickUpItem>
        <SearchKeys></SearchKeys>
        <Ranking></Ranking>
        <CategoryImg></CategoryImg>
        <NewItem></NewItem>
        <SpecialMessage></SpecialMessage>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import TopBanner from 'components/index/top_banner.vue'
import SpecialBanner from 'components/index/special_banner.vue'
import PickUpItem from 'components/index/pick_up_items.vue'
import SearchKeys from 'components/index/search_keys.vue'
import Ranking from 'components/index/ranking.vue'
import CategoryImg from 'components/index/categoryImg.vue'
import NewItem from 'components/index/newItem.vue'
import SpecialMessage from 'components/index/special_message.vue'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
        SpecialMessage
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