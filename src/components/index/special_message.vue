<template>
    <div id="special_message">
        <h2>BLOG</h2>
        <div v-for="item in data" :key="item.key" >
            <a :href="item.link" class="message_items">
                <div class="img">
                    <img v-lazy="item.image" alt="">
                </div>
                <div class="text" v-html="item.desc">
                </div>
            </a>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'
export default {
    name: '_specailMessage',
    setup() {
        const data = ref([
            {
                'key' : 1,
                'image' : require('assets/image/message1.png'),
                'desc' : '<p>sdfsdfsdfsdfsdf</p>',
                'link' : 'html'
            },
            {
                'key' : 2,
                'image' : require('assets/image/message2.png'),
                'desc' : '<p>sdfsdfsdfsdfsdf</p>'
            },
            {
                'key' : 3,
                'image' : require('assets/image/message3.png'),
                'desc' : '<p>sdfsdfsdfsdfsdf</p>'
            },
            {
                'key' : 4,
                'image' : require('assets/image/message4.png'),
                'desc' : '<p>sdfsdfsdfsdfsdf</p>'
            },
        ])

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
        }

        .text{
            width: calc( 100% - 135px);
            min-height: 120px;
        }
    }
}
</style>