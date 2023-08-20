<template>
  <Default>
    <div id="personal" class="content">
        <h2>MY PAGE</h2>
        <p class="name">{{ store.userName }}様</p>
        <p class="email">{{ store.email }}</p>
        <h3>注文状態</h3>

        <ul class="orderTip">
          <li v-for="item in orderTip" :key="item">
            <p>{{ item.name }}</p>
            <p>{{ item.num }}</p>
          </li>
        </ul>

        <ul class="personPage">
          <li>
            <img :src="require('assets/image/carbon_time.png')" alt="">
            <p>ご注文履歴</p>
          </li>
          <li>
            <img :src="require('assets/image/clarity_data-cluster-outline-badged.png')" alt="">
            <p>マイポイント</p>
          </li>
          <li>
            <img :src="require('assets/image/carbon_favorite.png')" alt="">
            <p>お気に入り</p>
          </li>
          <li>
            <router-link to="/address.html"> 
              <img :src="require('assets/image/carbon_map.png')" alt="">
              <p>配送先情報</p>
            </router-link>
          </li>
          <li>
            <img :src="require('assets/image/carbon_user-admin.png')" alt="">
            <p>会員登録の変更</p>
          </li>
          <li @click="logOut">
            <img :src="require('assets/image/carbon_logout.png')" alt="">
            <p>ログアウト</p>
          </li>
        </ul>

    </div>
  </Default>
</template>

<script>
import Default from 'components/tool/default.vue'
import { reactive , ref } from 'vue'
import { useCounterStore } from "@/store";
import axios from 'axios';
import { useRouter  } from 'vue-router';
export default {
  name: '_person',
  components: {
    Default
  },
  setup() {
    const router = useRouter()
    const store = useCounterStore()
    const userId = store.userId
    const loginStatus = ref(store.loginStatus)
    const orderTip = reactive({
      all :{
        name: '注文履歴',
        num: 0
      },
      pay:{
        name: '未入金',
        num: 0
      },
      payed: {
        name: '支払い済み',
        num: 0
      },
      consignment: {
        name: '出荷済み',
        num: 0
      },
      cancel: {
        name: 'キャンセル',
        num: 0
      }})
    const userName = store.userName
    const logOut = () => {
      axios.post('logOut', { userName }).then(res => {
        if (res.status == 200) {
          alert('退出成功')
          window.localStorage.removeItem('username')
          window.localStorage.removeItem('userLimit')
          store.$reset()
          router.go(0)
        }
      })
    }
    if (!loginStatus.value) {
      router.push('/')
    }
    const init = async() => {
      const { data: data } = await axios.post('getUserMessage', { userId })
      let orderAllNum = 0
      if (data.order) {
        for (let key in data.order) {
          orderTip[key].num = data.order[key].length
          orderAllNum +=  data.order[key].length
        }
        orderTip['all'].num = orderAllNum 
      }

    }
    init()
    return {
      store,
      orderTip,
      logOut
    }
  },
}
</script>

<style lang="less" scoped>
#personal{
  padding-left: 16px;
  padding-right: 16px;

  h2{
    font-size: 16px;
    text-align: center;
    font-weight: 600;
    padding: 25px 0 35px;
  }

  h3{
    font-size: 15px;
    font-weight: bold;
    margin: 20px 0 15px;
  }

  .name{
    font-size: 16px;
    color: #333;
    line-height: 20px;
    font-weight: 600;
  }
  .email{
    padding-top: 4px;
    font-size: 12px;
    color: #333;
    line-height: 16px;
    padding-bottom: 25px;
    border-bottom: 1px dashed #ddd;
  }
  .orderTip{
    .displayFlexCen();


    li{
      width: 25%;
      padding: 10px 0;
      text-align: center;
      border-right: 1px solid #ddd;

      &:last-of-type{
        border: 0;
      }

      p{
        color: #333;

        &:first-of-type{
          font-size: 12px;
          padding-bottom: 8px;
        }
        &:last-of-type{
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }

  .personPage{
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    padding: 0 16px;

    li{
      width: 50%;
      text-align: center;
      padding: 20px 0;

      img{
        width: 32px;
        height: autos;

        @media screen and (min-width: 750px) {
          width: 64px;
        }
      }

      p{
        padding-top: 8px;
        font-size: 12px;
      }
    }
  }
}
</style>