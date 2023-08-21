<template>
    <div id="footer">
        <div class="shareIcon">
            <template v-for="item in shareData" :key="item.name">
                <a :href="item.link">
                    <img v-lazy="item.img" :alt="item.name">
                </a>
            </template>
        </div>

        <p class="footerText">Copyright © 2023 PYPIO. All rights reserved.</p>
    </div>
</template>

<script>
import {ref} from 'vue'
export default {
    name: '_footer',
    setup() {
        const shareData = ref([
            {
                name: 'faceBook',
                link: 'faceBook.html',
                img: require('assets/image/facebook.png')
            },
            {
                name: 'twitter',
                link: 'twitter.html',
                img: require('assets/image/twitter.png')
            },
            {
                name: 'instagram',
                link: 'instagram.html',
                img: require('assets/image/instagram.png')
            },
        ])

        return {
            shareData
        }
    },
}
</script>

<style lang="less" scoped>
#footer{
    border-top: 1px solid #ddd;
    margin: 40px 0 20px;

    @media screen and (min-width: 750px) {
        width: 750px;
        margin: 0 auto;
    }

    .shareIcon{
        margin-top: 20px;
        .displayFlexCen();

        img{
            width: 32px;
            height: 32px;
            margin: 8px 4px;
        }
    }

    .footerText{
        font-size: 12px;
        text-align: center;
        padding: 18px 0 10px;
        color: #ccc;
    }
}
</style>