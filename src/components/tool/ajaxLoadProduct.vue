<template>
  <el-skeleton style="width: 100%" :loading="loading" animated>
    <template #template>
      <ul :infinite-scroll-disabled="disabled"  v-infinite-scroll="load" class="list" style="margin-top: 35px">
            <li v-for="item in loadCount" :key="item" class="list-item">
                <a :href="'/products.html?id=' + item">
                    <div class="img">
                        <el-skeleton-item variant="image" class="product_img_ver" style="height: 42vw;width: 46vq;"/>
                    </div>
                    <el-skeleton-item variant="text" style="width: 100%;margin: 15px 0;height: 18px;" class="name" v-if="showNameNow"/>
                    <el-skeleton-item variant="text" style="width: 100%;margin: 15px 0;height: 18px;"  class="price"/>
                    <el-skeleton-item variant="text" style="width: 100%;margin: 15px 0;height: 18px;" class="reviews" v-if="showReviewNow" />
                </a>
            </li>
        </ul>
    </template>
    <template  #default>
      <div class="product_items" v-if="productData.length > 0" style="margin-top: 35px">
          <template v-if="pageType == 'category'">
            <h2 style="padding:0 12px 20px;font-size: 14px;font-weight: 600;display: flex;justify-content: space-between;">
              <span>
                {{ categoryName }}
              </span>
              <span>【产品数量：{{ total }}】</span>
            </h2>
          </template>
          <template v-if="pageType == 'search'">
            <h2  style="padding:0 12px 20px;font-size: 14px;font-weight: 600;display: flex;justify-content: center;">
              KEYWORD:【{{ categoryName }}】
            </h2>
          </template>
        
        <ul :infinite-scroll-disabled="disabled"  v-infinite-scroll="load" class="list" >
            <li v-for="item in productData" :key="item.id" class="list-item">
                <a :href="'/products.html?id=' + item.id">
                    <div class="img">
                        <img v-lazy="item.product_img ? item.product_img.url : ''" alt="" :style="{ 'width': '100%', 'aspect-ratio': item.product_img ? item.product_img.imgMessage.scale : 1 }">
                    </div>
                    <p class="name" :class="overflwTezt" v-if="showNameNow" :style="nameStyleNow">{{ item.name }}</p>
                    <p class="price" :style="priceStyleNow">￥{{ item.price }}</p>
                    <p class="reviews" v-if="showReviewNow" :style="reviewsStyleNow">1</p>
                    <slot :items ="item"></slot>
                </a>
            </li>
        </ul>
        <p v-if="noMore" style="text-align: center;">No more</p>
    </div>
    </template>
  </el-skeleton>
  
</template>


/* 
    传参：
        overflwTezt ---- 文案溢出处理，传展示多少行；
        showNameNow ---- 是否展示产品名称，传Boolean;
        nameStyleNow ---- 自定义名称样式，例：nameStyleNow="color:#000;font-size:12px;";
        priceStyleNow ---- 自定义价格样式，例：priceStyleNow="color:#000;font-size:12px;";
        reviewsStyleNow ---- 自定义评论样式，例：reviewsStyleNow="color:#000;font-size:12px;"; 
        showReviewNow ---- 是否展示评论,传Boolean
        插槽 ---- 已传产品数据给父组件
        type ---- 页面类型
        cateId ---- 分类页ID
 */

<script>
import { ref, computed } from 'vue'
import { getCategoryProduct, getCategory } from 'assets/js/common.js'
import { ElLoading } from 'element-plus'
export default {
  props: {
    overflowText: {
      type: Number,
      default: 1
    },
    showName: {
      type: Boolean,
      default: true
    },
    showReview: {
      type: Boolean,
      default: false
    },
    nameStyle: {
      type: String,
      default: ''
    },
    priceStyle: {
      type: String,
      default: ''
    },
    reviewsStyle: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    cateId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const loadCount = ref(10)
    const showNameNow = ref(props.showName)
    const showReviewNow = ref(props.showReview)
    const nameStyleNow = ref(props.nameStyle)
    const priceStyleNow = ref(props.priceStyle)
    const reviewsStyleNow = ref(props.reviewsStyle)
    const pageType = ref(props.type)
    let init = null
    let ajaxProduct = null
    const productData = ref([])
    const cateId = ref(props.cateId)
    let cateArr = []
    const categoryName = ref('')
    const last_page = ref(1)
    const total = ref(0)
    const page = ref(1)

    const loading = ref(true)
    const noMore = computed(() => page.value == last_page.value)
    const disabled = computed(() => page.value == last_page.value || noMore.value)
    const load = () => {
      const loading2 = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      page.value++
      if (page.value <= last_page.value) {
        ajaxProduct(page.value, 60).then(res => {
          productData.value =[...productData.value,...res.data.data]
          loading2.close()
          console.log(res)
        })
      } else {
          loading2.close()
      }
    }

    if (pageType.value == 'category' || pageType.value == 'search') {
      ajaxProduct = (page,pageSize) => {
        return getCategoryProduct(cateArr, page, pageSize)
      }

      init = async () => {
        const { data: res } = await getCategory()
        getCateArr(res.arr, cateId)
        cateArr.sort(function (a, b) {
          return Number(a) - Number(b)
        })

        const { data: cateData } = await getCategoryProduct(cateArr, 1, 60)
        productData.value = cateData.data
        last_page.value = cateData.last_page
        total.value = cateData.total
        loading.value = false
        console.log(cateData)
      }
    }

    function getCateArr(data) {
      if (pageType.value == 'category') {
        data.forEach(item => {
          if (item.id == cateId.value) {
            cateArr.push(item.id)
            categoryName.value = item.title
            if (item.children) {
              forChildren(item.children)
            } else {
              return
            }
          } else {
            if (item.children) {
              getCateArr(item.children)
            } else {
              return
            }
          }
        })

      } else if (pageType.value == 'search') { 
        data.forEach(item => {
          if (item.title == cateId.value) {
            cateArr.push(item.id)
            categoryName.value = item.title
            if (item.children) {
              forChildren(item.children)
            } else {
              return
            }
          } else {
            if (item.children) {
              getCateArr(item.children)
            } else {
              return
            }
          }
         })

      }
    }

    function forChildren(data) {
      data.forEach(item => {
        cateArr.push(item.id)
        if (item.children) {
          forChildren(item.children)
        } else {
          return
        }
      })
    }

    

    init()
    const overflwTezt = computed(() => `overflwText${props.overflowText}`)

    return {
      overflwTezt,
      showNameNow,
      showReviewNow,
      nameStyleNow,
      priceStyleNow,
      reviewsStyleNow,
      productData,
      total,
      disabled,
      load,
      loading,
      loadCount,
      noMore,
      categoryName,
      pageType
    }
  },
}
</script>

<style lang="less" scoped>
ul {
  padding: 0 12px;
  .displayFlex();
  flex-wrap: @flex_wrap;
  justify-content: space-between;

  li {
    width: 46vw;
    margin-bottom: 15px;

    @media screen and (min-width: 750px) {
      width: 320px;
    }

    a {
      display: block;
      width: 46vw;

      @media screen and (min-width: 750px) {
        width: 320px;
      }

      .img {
        width: 46vw;
        height: 46vw;

        @media screen and (min-width: 750px) {
          width: 320px;
          height: 320px;
        }
      }

      .name {
        font-size: 12px;
        color: #3a3a3a;
        margin: 8px 0;
        line-height: 1.3em;
      }

      .price {
        font-size: 14px;
        color: #3a3a3a;
        font-weight: 600;
        padding-bottom: 8px;
      }
    }
  }
}
</style>