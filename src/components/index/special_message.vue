<template>
    <div id="special_message">
        <h2>BLOG</h2>
        <div v-for="item in data" :key="item.key" >
            <a :href="item.link" class="message_items">
                <div class="img">
                     <img v-lazy="item.img.url" alt="" :style="{ width: '100%', 'aspect-ratio': item.img.imgMessage.scale }">
                </div>
                <div class="text" v-html="item.desc" style="padding-top: 10px">
                </div>

            </a>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'
export default {
    name: '_specailMessage',
    props: {
        blofData: {
            type: Array,
            default: (() => [])
        }
    },
    setup(props) {
        const data = ref(props.blofData)

        return {
            data
        }
    },
}
</script>

<style lang="less" scoped>
#special_message{
    padding:  0 12px;

    h2{
        font-size: 24px;
        text-align: center;
        padding: 30px 0 15px;
    }

    .message_items{
        margin-block: 10px;
        display: flex;

        .img{
            width: 120px;
            height: auto;
            margin-right: 15px;

            @media screen and (min-width:750px) {
                width: 240px;
            }
        }

        .text{
            width: calc( 100% - 135px);
            min-height: 120px;

            font-size: 12px;
            line-height: 1.5em;

            display: flex;
            align-items: center;
        }
    }
}
</style>