<template>
  <div id="address">
  <el-skeleton style="width: 100%" :loading="loading" animated>
    <template #template>
      <el-skeleton-item variant="text" style="width: 100%;height: 500px;" />
    </template>
    <template #default>
      <template v-if="userAddress.length > 0">
        <el-radio-group v-model="radio1" class="ml-4">
            <div v-for="item in userAddress" :key="item.id" style="width: 100%;margin-bottom: 20px;">
              <el-radio :label="item.id" size="large" >
                <p>名前 : {{ item.user_name }}様 </p>
                <p>郵便番号 : {{ item.zip }} </p>
                <p>電話番号 : {{ item.tel }}</p>
                <p>住所: {{ item.status }}{{ item.province }}{{ item.street }} {{ item.other }}</p>
                <p>E-mail: {{ item.email }}</p>
                <span v-if="item.is_default == 1" class="defaultIcon">デフォルト</span>
              </el-radio>
              <div class="button">
                <el-button type="primary" @click="addressChange(item.id)">更改</el-button>
              </div>
            </div>
      </el-radio-group>
      </template>
      <template v-if="!userAddress.length">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            status-icon
          >
              <el-form-item label="氏名" prop="username">
                <el-input v-model="ruleForm.username" size="default" autocomplete="on"/>
              </el-form-item>
              <el-form-item label="電話番号" prop="tel">
                  <el-input v-model="ruleForm.tel" size="default" type="tel"/>
              </el-form-item>
              <div class="displayFlex">
                <p style="width: 120px;color: #606266;"><span style="color:#f56c6c;">*</span> 住所</p>
                <div style="width: calc(100% - 120px)">
                  <el-form-item label="" prop="state">
                    <el-select v-model="ruleForm.state" class="m-2" placeholder="日本" disabled></el-select>
                  </el-form-item>
                  <el-form-item label="" prop="province">
                    <el-select v-model="ruleForm.province" class="m-2" placeholder="都道府県" @change="provinceChange">
                        <el-option
                          v-for="item in provinceOptions"
                          :key="item"
                          :label="item"
                          :value="item"
                        />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="" prop="city">
                    <el-select v-model="ruleForm.city" class="m-2" placeholder="市区" @change="cityChange">
                        <el-option
                          v-for="item in cityOptions"
                          :key="item"
                          :label="item"
                          :value="item"
                        />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="" prop="street">
                    <el-select v-model="ruleForm.street" class="m-2" placeholder="町村" @change="streetChange">
                        <el-option
                          v-for="item in streetOptions"
                          :key="item.zip"
                          :label="item.name"
                          :value="item.name"
                        />
                    </el-select>
                  </el-form-item>
                    <el-form-item label="" prop="other">
                        <el-input v-model="ruleForm.other" size="default" type="text" placeholder="番地/ビル・マンション名"/>
                    </el-form-item>
                </div>
              </div>
              <el-form-item label="郵便番号" prop="zip">
                  <el-input v-model="ruleForm.zip" size="default" type="number"/>
              </el-form-item>
              <el-form-item label="E-mail" prop="email">
                <el-input v-model="ruleForm.email" size="default" type="email"/>
              </el-form-item>
              <div style="display: flex;align-items: center;font-size: 12px;">
                <el-switch v-model="ruleForm.default"  style="margin-right: 8px;--el-switch-on-color: #222;"/>デフォルトの配送先として保存
              </div>
          </el-form>
      </template>
    </template>
  </el-skeleton>
   
  </div>
</template>

<script>
import {reactive,ref} from 'vue'
import axios from 'axios'
import { useCounterStore } from "@/store";
import { useRouter } from 'vue-router'
export default {
  name: '_address',
  setup() {
    const loading = ref(true)
    const store = useCounterStore()
    const router = useRouter()
    const userId = store.userId
    const ruleFormRef = ref()
    const provinceOptions = ref([])
    const cityOptions = ref([])
    const streetOptions = ref([])
    const addressList = ref({})
    const isAddress = ref(false)
    const userAddress = ref([])
    const radio1 = ref(0)
    const init = async () => {
      const { data: data } = await axios.post('getUserAddress', { userId })
      console.log(data)
      if (data.status == 200 && data.data.length > 0) {
        isAddress.value = true
        userAddress.value = data.data
        userAddress.value.forEach((item) => {
          if (item.is_default == 1) {
            radio1.value = item.id
          }
        })
        loading.value = false
      } else {
        const { data: data } = await axios.post('gerAddressMessage')
        console.log(data.data)
        addressList.value = data.data
        for (let key in addressList.value) {
          provinceOptions.value.push(key)
        }
        loading.value = false
      }
    }
    init()
    const ruleForm = reactive({
      username: '',
      email: '',
      tel: '',
      zip: '',
      state: '日本',
      province: '',
      city: '',
      street: '',
      other: '',
      default: false,
    })
    const provinceChange = (val) => {
      cityOptions.value = []
      if (addressList.value) {
        for (let key in addressList.value) {
          if (key == val) {
            for (let key2 in addressList.value[key]) {
              cityOptions.value.push(key2)
            }
          }
        }
      }
    }
    const cityChange = (val) => {
      streetOptions.value = []
      if (addressList.value) {
        for (let key in addressList.value) {
          if (key == ruleForm.province) {
            for (let key2 in addressList.value[key]) {
              if (key2 == val) {
                const arr = addressList.value[key][key2]
                for (let i = 0; i < arr.length; i++) {
                  streetOptions.value.push({
                    name: arr[i].town,
                    zip: arr[i].zip_code,
                  })
                }
              }
            }
          }
        }
      }
    }

    const streetChange = (val) => {
      streetOptions.value.forEach(item => {
        if (item.name == val) {
          ruleForm.zip = item.zip
        }
      })
    }

    const checkEmail = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('Please input Activity eamil'))
      } else {
        if ((ruleForm.email).match(
          /^[a-zA-Z0-9_\.]+@[a-zA-Z0-9-]+[\.a-zA-Z]+$/   // eslint-disable-line
        )) {
          callback()
        } else {
          callback(new Error("Please input Activity eamil"))
        }
      }
    }
    const checkTel = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('Please input Activity tel'))
      } else {
        if ((ruleForm.tel).match(
          /^090-\d{8}$/   // eslint-disable-line
        )) {
          callback()
        } else {
          callback(new Error("Please input Activity tel (090-***)"))
        }

      }
    }

    const rules = reactive({
      username: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ],
      email: [
        { required: true, message: 'Please input Activity eamil', trigger: 'blur' },
        { validator: checkEmail, trigger: 'blur' }
      ],
      tel: [
        { required: true, message: 'Please input Activity tel', trigger: 'blur' },
        { min: 12, max: 12, message: 'Length should be 11', trigger: 'blur' },
        { validator: checkTel, trigger: 'blur' }
      ],
      zip: [
        { required: true, message: 'Please input Activity zip', trigger: 'blur' }
      ],
      province: [
        { required: true, message: 'Please input Activity province', trigger: 'change' }
      ],
      city: [
        { required: true, message: 'Please input Activity city', trigger: 'change' }
      ],
      street: [
        { required: true, message: 'Please input Activity street', trigger: 'change' }
      ]
    })
    const addressChange = (id) => {
      userAddress.value.forEach(item => {
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
            default: item.default == 1 ? true : false
          }
          window.localStorage.setItem('defaultAddressMessage', JSON.stringify(defaultMessage))
          router.push({ path: 'addressChange.html', query: { id: `${id}` } })
        }
      })
    }

    const checkFrom = async () => {
      return new Promise((resolve, reject) => {
        ruleFormRef.value.validate((valid) => {
          if (valid) {
            resolve()
          } else {
            reject()
          }
        })
      })
    }

    return {
      ruleForm,
      rules,
      cityOptions,
      provinceOptions,
      streetOptions,
      checkFrom,
      ruleFormRef,
      provinceChange,
      cityChange,
      streetChange,
      userAddress,
      radio1,
      addressChange,
      loading
    }
  },
}
</script>

<style lang="less" scoped>
#address{
  padding: 0 16px;

  .el-form-item__label{
    justify-content: flex-start;
  }

  .el-select{
    width: 100%;
  }

  .el-input.is-disabled .el-input__wrapper{
    background: #ddd;
  }
  .el-form-item__content{
    width: 100%;
    margin-left: 0 !important;
  }

  .el-radio-group {
    display: flex;
    width: 100%;

    .el-radio{
      margin-top: 25px;
      color: #333;
      line-height: 1.5em;
      font-size: 13px;
      position: relative;
      height: auto !important;
      width: 100%;
      margin: 0;

      .el-radio__label{
        width: 100%
      }

      .defaultIcon{
        position: absolute;
        top: 0;
        right: 0;
        display: inline-block;
        padding: 3px 4px;
        border: 1px solid #FF0E0E;
        color: #FF0E0E;
      }
    }
    
    .button{
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;

      .el-button{
        width: 30%;
        height: 36px;
        line-height: 36px;
        background: #fff;
        color: #333;
        border: 1px solid #ddd;
        border-radius: 0;
      }
    }
  }

    .el-radio__input.is-checked .el-radio__inner {
    background: #222;
    border-color: #222;
  }

  .el-radio__input.is-checked+.el-radio__label {
    color: #222;
    font-weight: 600;
  }
}
</style>
