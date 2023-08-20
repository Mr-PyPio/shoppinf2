<template>
  <div id="recommend" class="productList" v-if="recommendProduct.length > 0">
      <ProductItem :productList="recommendProduct"></ProductItem>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getCatalogDetail } from 'assets/js/common.js'
import ProductItem from 'components/tool/productItem.vue'
export default {
  components: {
    ProductItem
  },
  setup() {
    const recommendProduct = ref([])
    const init = async () => {
      const data = await getCatalogDetail('products_recommond')
      if (data) {
        recommendProduct.value = data.productList
      }
    }

    init()

    return {
      recommendProduct
    }
  }
}
</script>

<style>

</style>