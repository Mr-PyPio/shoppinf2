<template>
    <div id="home">
        <Header></Header>
        <TopBanner></TopBanner>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import Header from 'components/header.vue'
import TopBanner from 'components/index/top_banner.vue'
export default defineComponent({
    name: 'home_',
    components: {
        Header,
        TopBanner
    },
    setup() {


        return {
            
        }
    }
})
</script>

<style lang="less" scoped>

</style>