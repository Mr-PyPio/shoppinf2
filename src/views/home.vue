<template>
    <div id="home">
        <Header></Header>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import Header from 'components/header.vue'
export default defineComponent({
    name: 'home_',
    components: {
        Header
    },
    setup() {


        return {
            
        }
    }
})
</script>

<style lang="less" scoped>

</style>