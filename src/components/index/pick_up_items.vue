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
                <a :href="item.link">
                    <img :src="item.img" :alt="item.id">
                    <p class="name">{{item.name}}</p>
                    <p class="price">{{item.price}}</p>
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
    setup() {
        const pickUpProducts = ref([
            {
                name: '起毛canadaスウェット',
                link: 'html',
                img: require('assets/image/Rectangle.png'),
                price: '￥2,660',
                id: '10'
            },
            {
                name: '起毛canadaスウェット',
                link: 'html',
                img: require('assets/image/Rectangle.png'),
                price: '￥2,660',
                id: '11'
            },
                        {
                name: '起毛canadaスウェット',
                link: 'html',
                img: require('assets/image/Rectangle.png'),
                price: '￥2,660',
                id: '12'
            },
                        {
                name: '起毛canadaスウェット',
                link: 'html',
                img: require('assets/image/Rectangle.png'),
                price: '￥2,660',
                id: '13'
            },
                        {
                name: '起毛canadaスウェット',
                link: 'html',
                img: require('assets/image/Rectangle.png'),
                price: '￥2,660',
                id: '14'
            }
        ])
        
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
        font-size: 16px;
        font-weight: bold;
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
