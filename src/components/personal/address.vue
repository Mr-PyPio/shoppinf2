<template>
  <Default>
    <div id="address" class="content">
        <h1>
            <el-icon class="title_icon" @click="titleClick"><ArrowLeftBold /></el-icon>
            ADDRESS LIST
        </h1>

        <ul v-if="addressList.length > 0">
          <li v-for="item in addressList" :key="item.id">
            <p>名前 : {{ item.user_name }}様 </p>
            <p>郵便番号 : {{ item.zip }} </p>
            <p>電話番号 : {{ item.tel }}</p>
            <p>住所: {{ item.status }}{{ item.province }}{{ item.street }} {{ item.other }}</p>
            <p>E-mail: {{ item.email }}</p>
            <span v-if="item.is_default == 1" class="defaultIcon">デフォルト</span>
            <div class="button">
              <el-button type="primary" :loading="loading[item.id]" @click="addressDelete(item.id)">删除</el-button>
              <el-button type="primary" @click="addressChange(item.id)">更改</el-button>
            </div>
          </li>
        </ul>
    </div>
  </Default>
</template>

<script>
import { useCounterStore } from "@/store";
import {ref,reactive} from 'vue'
import axios from 'axios';
import Default from 'components/tool/default.vue'
import { useRouter } from 'vue-router'
export default {
  name: '_address',
  components: {
    Default
  },
  setup() {
    const store = useCounterStore()
    const router = useRouter()
    const userId = store.userId
    const addressList = ref([])
    const loading = reactive({})
    const init = async () => {
      const { data: data } = await axios.post('getUserAddress', { userId })
      addressList.value = data.data
      addressList.value.forEach(item => {
        loading[item.id] = false
      })
    } 
    init()

    const addressDelete = async (id) => {
      loading[id] = true
      const { data: data } = await axios.post('addressDelete', { id })
      if (data.status == 200) {
        addressList.value = addressList.value.filter((item) => {
            return id != item.id
        })
      }
    }
    const addressChange = (id) => {
      addressList.value.forEach(item => {
        if (item.id == id) {
          const defaultMessage = {
            username: item.user_name,
            email: item.email,
            tel: item.tel,
            zip: item.zip,
            state: item.state,
            province: item.province,
            city: item.city,
            street: item.street,
            other: item.other,
            default: item.is_default == 1 ? true:false
          }
          window.localStorage.setItem('defaultAddressMessage', JSON.stringify(defaultMessage))
          router.push({ path: 'addressChange.html', query: { id: `${id}` } })
        }
      })
    }
    const titleClick = () => {
      router.go(-1)
    }

    return {
      addressList,
      loading,
      addressDelete,
      addressChange,
      titleClick
    }
  },
}
</script>

<style lang="less" scoped>
#address{
  h1{
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    position: relative;
    margin-top: 20px;

    .title_icon{
      position: absolute;
      width: 24px;
      height: 24px;
      top: 50%;
      transform: translateY(-50%);
      left: 16px
    }
  }

  ul{
    padding:0 16px;

    li{
      margin-top: 25px;
      color: #333;
      line-height: 1.5em;
      font-size: 13px;
      position: relative;

      .defaultIcon{
        position: absolute;
        top: 0;
        right: 0;
        display: inline-block;
        padding: 3px 4px;
        border: 1px solid #FF0E0E;
        color: #FF0E0E;
      }

    .button{
      display: flex;
      justify-content: center;
      margin-top: 10px;

      .el-button{
        width: 30%;
        margin: 0 10%;
        height: 36px;
        line-height: 36px;
        background: #fff;
        color: #333;
        border: 1px solid #ddd;
        border-radius: 0;
      }
    }
    }
  }
}
</style>