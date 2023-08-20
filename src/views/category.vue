<template>
  <Default>
    <div id="category" class="content">
      <el-skeleton style="width: 100%" :loading="loading" animated>
        <template #template>
            <el-skeleton-item variant="image" class="img_ver" />
        </template>
        <template  #default>
          <SwiperTools v-if="topBanner.length > 0"  pagination="true" code="index_top" :swiperData="topBanner"></SwiperTools>
        </template>
      </el-skeleton>

      <AjaxLoadProduct :overflowText="2" type="category" :cateId = "cateId" ></AjaxLoadProduct>
      
    </div>
  </Default>
</template>

<script>
import { ref, defineAsyncComponent } from 'vue'
import Default from 'components/tool/default.vue'
import { useRouter } from 'vue-router'
import {getBannerDetail } from 'assets/js/common.js'
const SwiperTools = defineAsyncComponent(() => import('components/tool/swiperTools.vue'))
const AjaxLoadProduct = defineAsyncComponent(() => import('components/tool/ajaxLoadProduct.vue'))
export default {
  name: '_category',
  components: {
    Default,
    SwiperTools,
    AjaxLoadProduct
  },
  setup() {
    const router = useRouter()
    const cateId = ref(router.currentRoute.value.query.id)
    const topBanner = ref([])
    const loading = ref(true)
    const init = async () => {
      const data1 = await getBannerDetail('category_top')
      if (data1) {
        topBanner.value = JSON.parse(data1.detail)
      }
      loading.value = false
    }
    init()

    return {
      cateId,
      topBanner,
      loading,
    }
  },
}
</script>

<style lang="less">
#category{
    .img_ver{
        width: 100vw;
        height: 40vw;

        @media screen and (min-width: 750px) {
            width: 750px;
            height: 300px
        }
    }
}
</style>