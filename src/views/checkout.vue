<template>
    <Default>
      <div id="checkout" class="content">
        <h1>
          <el-icon class="title_icon" @click="titleClick"><ArrowLeftBold /></el-icon>
          注文/支払い
        </h1>
        <h3 @click="changStatus('address')">配送先 
          <el-icon class="title_arrow" :class="{'transform' : !show.address }">
            <ArrowDownBold />
          </el-icon>
        </h3>
        <Address ref="AddressRefs" :style="{ 'display': show.address ? 'block' : 'none' }"></Address>

        <h3 @click="changStatus('shop')">注文商品 
            <p><span style="color: #666666;padding-right: 8px;">{{ allQty }}点</span>
              <el-icon class="title_arrow" :class="{ 'transform': !show.shop }">
                <ArrowDownBold />
              </el-icon> 
            </p>
        </h3>
        <ShopList :data="cartList" v-if="cartList.length > 0" :style="{ 'display': show.shop ? 'block' : 'none' }"></ShopList>

        <h3 @click="changStatus('send')">配送方法 
            <el-icon class="title_arrow" :class="{ 'transform': !show.send }">
              <ArrowDownBold />
            </el-icon>
        </h3>

        <SendType ref="SendTypeRefs"></SendType>

        <h3 @click="changStatus('pay')">お支払い方法 
            <el-icon class="title_arrow" :class="{ 'transform': !show.pay }">
              <ArrowDownBold />
            </el-icon>
        </h3>
        <PayType ref="PayTypeRefs"></PayType>

        <h3 style="background:#DDD">ご注文内容</h3>

        <div class="priceDetail">
          <ul>
            <li>
              <span>商品小計（税込）</span>
              <span>￥{{ allPrice }}税込</span>
            </li>
            <li>
                <span>送料</span>
                <span>￥{{ sendPrice }}</span>
            </li>
            <li>
                <span>割引</span>
                <span>0</span>
            </li>
          </ul>
          <div class="endPrice">
            <span>合計金額（税込）</span>
            <span>￥{{ Number(allPrice) + Number(sendPrice) }}税込</span>
          </div>
        </div>

        <el-button type="default" class="checkout" color="#000" @click="checkoutSumbit">￥{{ Number(allPrice)+ sendPrice }}税込 お支払い</el-button>
      </div>
    </Default>
</template>


<script>
import Default from 'components/tool/default.vue'
import axios from 'axios'
import Address from 'components/checkout/address.vue'
import ShopList from 'components/tool/shopProductList.vue'
import SendType from 'components/tool/sendType.vue'
import PayType from 'components/tool/payType.vue'
import { ref, reactive,computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from "@/store";
import { ElLoading } from 'element-plus'
export default {
  name: '_checkout',
  components: {
    Default,
    Address,
    ShopList,
    SendType,
    PayType
  },
  setup() {
    const SendTypeRefs = ref(null)
    const PayTypeRefs = ref(null)
    const AddressRefs = ref(null)
    const cartList = ref([])
    const allQty = ref(0)
    const allPrice = ref(0)
    const allListPrice = ref(0)
    const show = reactive({
      address: true,
      shop: true,
      pay: true,
      send: true
    })
    const allShopNum = ref(2)
    const store = useCounterStore()
    const userId = store.userId
    const userName = store.userName
    const router = useRouter()
    const titleClick = () => {
      router.go(-1)
    }
    const changStatus = key => {
      const old_key = show[key]
      show[key] = !old_key
    }

    const init = async () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      const { data: data } = await axios.post('getCartList', { id: userId })
      if (data.status == 200) {
        cartList.value = data.product_list ? data.product_list : []
        cartList.value.forEach(item => {
          allQty.value += item.qty
          allPrice.value += parseInt(item.price * item.qty)
          allListPrice.value += parseInt(item.list_price * item.qty)
        })
      } 
      loading.close()
    }

    if (!store.loginStatus) {
      router.push('/login.html')
    } else {
      init()
    }
    let sendPrice = 956
    sendPrice = computed(() => SendTypeRefs.value ? Number(SendTypeRefs.value.sendPrice) : 956)
    const checkoutSumbit = async () => {
      const sendName = SendTypeRefs.value.sendName
      const payName = PayTypeRefs.value.payName
      const address = AddressRefs.value.radio1 ? {} :AddressRefs.value.ruleForm
      const addressId = AddressRefs.value.radio1
      if (addressId) {
        const data = {
          sendName,
          payName,
          sendPrice: sendPrice.value,
          allPrice: allPrice.value + sendPrice.value,
          addressId
        }
        const res = await axios.post('checkout', { data, userId, userName })
        if (res.status == 200) {
          router.push('/payment_success.html')
        } else {
          router.push('/payment_failure.html')
        }
      } else {
        AddressRefs.value.checkFrom().then(async () => {
          const data = {
            sendName,
            payName,
            sendPrice : sendPrice.value,
            allPrice: allPrice.value + sendPrice.value,
            address,
            addressId
          }
        
          console.log(sendName, payName, sendPrice, data)

          const res = await axios.post('checkout', { data, userId, userName })

          if (res.status == 200) {
            router.push('/payment_success.html')
          } else {
            router.push('/payment_failure.html')
          }
          
        }).catch(() => {
          alert('情報が不完全です')
        })
      }

    }
    return {
      titleClick,
      store,
      AddressRefs,
      changStatus,
      show,
      allShopNum,
      cartList,
      allPrice,
      allQty,
      PayTypeRefs,
      SendTypeRefs,
      checkoutSumbit,
      sendPrice
    }
  },
}
</script>

<style lang="less" scoped>
#checkout{
  h1{
    font-size: 16px;
    text-align: center;
    position: relative;
    height: 44px;
    line-height: 44px;
    background: #EDEDED;;

    .title_icon{
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
    }
  }

  h3{
    height: 48px;
    line-height: 48px;
    padding: 0 12px;
    font-size: 14px;
    font-weight: 600;
    .displayFlexBew();
    border-bottom: 1px solid #EDEDED;
    border-top: 1px solid #EDEDED;
    margin: 12px 0;

    .title_arrow.transform{
      transform: rotate(180deg)
    }
  }

  .priceDetail{
    padding: 10px 12px;

    li{
      height: 36px;
      line-height: 20px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      padding: 8px;
    }

    .endPrice{
      display: flex;
      justify-content: space-between;
      height: 36px;
      line-height: 20px;
      padding: 8px;
      font-weight: 600;
      font-size: 15px;
      background: #EDEDED;
    }
  }
  .checkout{
    width: 80%;
    margin: 20px auto;
    border: 0;
    height: 48px;
    font-size: 16px;
    display: block;
  }
}
</style>