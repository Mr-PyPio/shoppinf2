<template>
    <Default>
        <div id="search" class="content">

            <AjaxLoadProduct :overflowText="2" type="search" :cateId="cateId"></AjaxLoadProduct>

        </div>
    </Default>
</template>

<script>
import { ref, defineAsyncComponent } from 'vue'
import Default from 'components/tool/default.vue'
import { useRouter } from 'vue-router'
const AjaxLoadProduct = defineAsyncComponent(() => import('components/tool/ajaxLoadProduct.vue'))
export default {
    name: '_search',
    components: {
        Default,
        AjaxLoadProduct
    },
    setup() {
        const router = useRouter()
        const cateId = ref(router.currentRoute.value.query.keys)

        return {
            cateId,
        }
    },
}
</script>

<style lang="less">
#search {
    .img_ver {
        width: 100vw;
        height: 40vw;

        @media screen and (min-width: 750px) {
            width: 750px;
            height: 300px
        }
    }
}
</style>