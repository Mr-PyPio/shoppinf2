<template>
    <div class="pickUpItems">
        <h2>PICK UP ITEM</h2>
        <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'" navigation :loop="true"
            :pagination="true" :modules="modules" class="mySwiper"
            :autoplay="{
                delay: 3000,
                disableOnInteraction: false,
            }"
            :coverflowEffect="{
                rotate: 10,
                stretch: -15,
                depth: 120,
                modifier: 1,
                slideShadows: false,
            }"
        >
            <swiper-slide v-for="item in pickUpProducts" :key="item.id">
                <a :href="'/products.html?id=' + item.id">
                    <img v-lazy="item.product_img? item.product_img.url:''" :alt="item.id" style="border-radius: 8px;">
                    <p class="name">{{item.name}}</p>
                    <p class="price">￥{{item.price}}</p>
                </a>
            </swiper-slide>
        </swiper>
        </div>
</template>


<script>
import { defineComponent,ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, A11y, Autoplay ,EffectCoverflow} from 'swiper/modules';
  import 'swiper/css/effect-coverflow';

export default defineComponent({
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        pickUpData: {
            type: Array,
            default: (()=> [])
        }
    },
    setup(props) {
        const pickUpProducts = ref(props.pickUpData)

        
        return {
            pickUpProducts,
            modules: [Navigation, A11y, Autoplay, EffectCoverflow],
        }
    },
})
</script>

<style lang="less" scoped>
.pickUpItems{
    background: #F8F8F8;

    h2{
        font-size: 24px;
        font-weight: 500;
        padding:20px 0 12px;
        text-align: center;
    }

    .swiper {
        width: 100%;
        padding-top: 8px;
        padding-bottom: 20px;
    }

    .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 188px;
        height: auto;

        @media screen and (min-width: 750px) {
            width: 360px;
        }
        
        img {
            display: block;
            width: 100%;
        }
        p.name{
            text-align: center;
            font-size: 12px;
            padding:8px 0;
            .overflwText1()
        }

        p.price{
            font-size: 14px;
            padding-bottom: 10px;
            text-align: center;
        }
    }
}
</style>
