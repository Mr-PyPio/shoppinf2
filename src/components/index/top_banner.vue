<template>
    <div id="top_banner">
        <el-carousel :interval="5000" arrow="always" height="auto">
            <el-carousel-item v-for="item in bannerImgData" :key="item.key" :style="{height: item.imageSize.style + 'px'}">
                <img :src="item.image" :alt="item.imageSize.scale"  style="width: 100%;">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import {ref} from 'vue'
export default {
    setup() {
        const bannerImgData = ref([])
        const bannerImg = ref([
            {
                key: 1,
                image: require('assets/image/indexBanner.gif')
            },
            {
                key: 2,
                image: require('assets/image/indexBanner.gif')
            },
            {
                key: 3,
                image: require('assets/image/indexBanner.gif')
            },
        ])

        const getImgSize = url => {
            let width = window.innerWidth > 750 ? 750 :  window.innerWidth
            return new Promise(resolve => {
                let imgObj = new Image()
                imgObj.src = url
                imgObj.onload = () => {
                    let scale = parseFloat(imgObj.height/imgObj.width)
                    resolve({
                        width: imgObj.width,
                        height: imgObj.height,
                        scale: scale,
                        style: width * scale
                    })
                }
            })
        }

        

        bannerImg.value.forEach(async item => {
            item.imageSize = await getImgSize(item.image)
            bannerImgData.value.push(item)
        });

        return {
            bannerImg,
            getImgSize,
            bannerImgData
        }
    },
}
</script>

<style scoped>
</style>