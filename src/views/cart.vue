<template>
  <Default>
    <div id="cart" class="content">
        <h2>SHOPPING CART</h2>
        <ul v-if="cartList.length> 0">
          <li v-for="item in cartList" :key="item.key">
            <a :href="'/products.html?id=' + item.id">
              <img v-lazy="item.product_img.url" alt="" :style="{ width: '100px', 'aspect-ratio': 1/ item.product_img.imgMessage.scale }">
            </a>
            <div class="text">
              <p class="name">{{ item.name }}</p>
              <p class="option">{{ item.color }}/{{  item.size}}</p>
              <p class="list_price">￥{{ item.list_price  }}税込</p>
              <div class="price">￥{{ item.price }}<span>税込</span>
                <div class="changeNumber">
                    <button type="button" @click="decrease(item.id)">-</button>
                    <input type="number" :value="qtyObj[item.id]">
                    <button type="button" @click="add(item.id)">+</button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div :style="{display: isEmpty ? 'block' : 'none'}">
          <el-empty description="ショッピングカートが空です。" />
        </div>

        <h2>RECOMMENDATION</h2>
        <div class="productList" v-if="recommendProduct.length > 0">
          <ProductItem :productList="recommendProduct"></ProductItem>
        </div>

        <div class="checkoutBtn">
          <div class="checkoutText">
              <p style="font-size: 12px;color: red;font-weight: 600;">
                <span style="color: #222">合計</span><span style="font-size: 20px;">￥{{ allPrice }}</span>税込
              </p>
              <p style="font-size: 12px;color: red;padding-top: 8px;">合計割引￥{{ discountPrice }}</p>
          </div>
          <router-link to="/checkout.html" style="display: block;width: 55%;">
            <el-button type="default"  color="#000">レジに進む</el-button>
          </router-link>
        </div>
    </div>
  </Default>
</template>

<script>
import { ref, reactive } from 'vue'
import Default from 'components/tool/default.vue'
import axios from 'axios'
import { useCounterStore } from "@/store";
import { ElLoading } from 'element-plus'
import { getCatalogDetail } from 'assets/js/common.js'
import ProductItem from 'components/tool/productItem.vue'
import { useRouter } from 'vue-router'
export default {
  name: '_cart',
  components: {
    Default,
    ProductItem
  },
  setup() {
    const isEmpty = ref(false)
    const router = useRouter()
    const store = useCounterStore()
    const cartList = ref([])
    const userId = store.userId
    const recommendProduct = ref([])
    const allQty = ref(0)
    const allPrice = ref(0)
    const allListPrice = ref(0)
    const discountPrice = ref(0)
    const qtyObj = reactive({})
    const init = async () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      if (userId) {
        const { data: data } = await axios.post('getCartList', { id: userId })
        if (data.status == 200) {
          computePriceOther(data)
        } else {
          store.cartNum = 0
          isEmpty.value = true
        }
        loading.close()
      } else {
        const cartListNo = store.noLoginCartData
        if (cartListNo.length > 0) {
          const {data: data} = await axios.post('getCartListNo',{ cartList: cartListNo })
          computePriceOther(data)
        } else {
          store.cartNum = 0
          isEmpty.value = true
        }
        loading.close()
      }
      const data2 = await getCatalogDetail('products_recommond')
      if (data2) {
        recommendProduct.value = data2.productList
      }
    }
    init()
    const decrease = (id) => {
      if (qtyObj[id] > 0) {
        qtyObj[id] -= 1
        if (userId) {
            changeCart(id)
        } else {
          changeCartNo(id)
        }
      }
    }

    const computePriceOther = (data) => {
      cartList.value = data.product_list ? data.product_list : []
      if (cartList.value.length <= 0) {
        isEmpty.value = true
        store.cartNum = 0
      } else {
        cartList.value.forEach(item => {
          allQty.value += item.qty
          allPrice.value += parseInt(item.price * item.qty)
          allListPrice.value += parseInt(item.list_price * item.qty)

          qtyObj[item.id] = item.qty
        })

        discountPrice.value = allListPrice.value - allPrice.value
      }
    }
    const add = (id) => {
      if (qtyObj[id] < 100) {
          qtyObj[id] += 1
        if (userId) {
          changeCart(id)
        } else {
          changeCartNo(id)
        }
      }
    }

    const changeCartNo = (id) => {
      let spliceKey = 0
      const cartListNo = store.noLoginCartData
      cartListNo.forEach((item, key) => {
        if (item.product_id == id) {
          if (qtyObj[id] == 0) {
            spliceKey = key + 1
          } else {
            item.qty = qtyObj[id]
          }
        }
      })
      if (spliceKey > 0) {
        cartListNo.splice(spliceKey - 1, 1)
      }
      router.go(0)
    }

    const changeCart = (id) => {
      axios.post('changeCart', {
        user_id: userId,
        product_id: id,
        qty: qtyObj[id]
      }).then(res => {
        if (res.status == 200) {
          router.go(0)
        } else {
          alert(res.message)
        }
      })
    }
    return {
      cartList,
      recommendProduct,
      allListPrice,
      allQty,
      allPrice,
      discountPrice,
      decrease,
      add,
      qtyObj,
      isEmpty
    }
  },
}
</script>
<style lang="less" scoped>
#cart{
  min-height: calc(100vh - 171px);
  box-sizing: border-box;

  h2{
    text-align: center;font-size: 16px;padding: 20px 0;color: #222;font-weight: bold;
  }

  ul{
    margin-bottom: 20px;
    padding: 0 12px;

    li{
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid #ddd;

      a{
        display: block;
        width: 100px;
        margin-right: 12px;
      }

      .text{
        width: calc(100% - 112px);

        .name{
          .overflwText1();
          font-size: 12px;
          padding-bottom: 12px;
          color: #222;
        }
        .option{
          padding-bottom: 15px;
          font-size: 12px;
          color: #999;
        }
        .list_price{
          font-size: 12px;
          color: #999;
          text-decoration: line-through;
          padding-bottom: 8px;
        }

        .price{
          font-size: 16px;
          color: #333;
          font-weight: 600;
          position: relative;

          .changeNumber{
                font-size: 12px;
                position: absolute;
                right: 10px;
                bottom: 0;
                display: flex;
                align-content: center;

                span{
                    width: 90px;
                }

                button{
                    width: 30px;
                    height: 30px;
                    .displayFlexCen();
                    border-color: #ddd;
                    border-radius: 0;
                }

                input{
                    border-radius: 0;
                    border: 0;
                    border-top: 1px solid #ddd;
                    border-bottom: 1px solid #ddd;
                    height: 30px;
                    line-height: 30px;
                    width: 40px;
                    text-align: center;
                }
            }
          span{
            font-size: 12px;
          }
        }
      }
    }
  }

  .checkoutBtn{
    .displayFlexBew();
    position: fixed;
    width: 100vw;
    height: 61px;
    background: #fff;
    z-index: 1;
    border-top: 1px solid #ddd;
    box-shadow: 0 2px 5px 2px #222;
    box-sizing: border-box;
    left: 0;
    bottom: 0;

    @media screen and (min-width: 750px) {
        width: 750px;
        left: 50%;
        transform: translateX(-50%);
    }

    .checkoutText{
      width: 40%;
      padding-left: 16px;
      box-sizing: border-box;
      text-align: center;
    }
    .el-button{
      width:100%;
      height: 60px;
      line-height: 60px;
      border-radius: 0;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
<style>
#footer{padding-bottom: 60px;}
</style>