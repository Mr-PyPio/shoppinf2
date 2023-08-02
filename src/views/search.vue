<template>
    <div id="search">
        {{keyName}}
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    name: '_search',
    setup() {
        const router = useRouter()
        const keyName = router.currentRoute.value.query.keys
        return{
            keyName
        }
    },
}
</script>

<style lang="less" scoped>

</style>