<template>
  <Default>
    <div id="hot" class="content">
      <el-skeleton style="width: 100%" :loading="loading" animated>
        <template #template>
          <el-skeleton-item variant="image" class="img_ver" />
        </template>
        <template #default>
          <SwiperTools v-if="topBanner.length > 0" pagination="true" code="index_top" :swiperData="topBanner">
          </SwiperTools>
        </template>
      </el-skeleton>

      <AjaxLoadProduct :overflowText="2" code="hot"></AjaxLoadProduct>

    </div>
  </Default>
</template>

<script>
import { ref, defineAsyncComponent } from 'vue'
import Default from 'components/tool/default.vue'
import { getBannerDetail } from 'assets/js/common.js'
const SwiperTools = defineAsyncComponent(() => import('components/tool/swiperTools.vue'))
const AjaxLoadProduct = defineAsyncComponent(() => import('components/tool/ajaxLoadProduct2.vue'))
export default {
  name: '_hot',
  components: {
    Default,
    SwiperTools,
    AjaxLoadProduct
  },
  setup() {
    const topBanner = ref([])
    const loading = ref(true)
    const init = async () => {
      const data1 = await getBannerDetail('hot_top')
      if (data1) {
        topBanner.value = JSON.parse(data1.detail)
      }
      loading.value = false
    }
    init()

    return {
      topBanner,
      loading,
    }
  },
}
</script>

<style lang="less">
#hot {
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